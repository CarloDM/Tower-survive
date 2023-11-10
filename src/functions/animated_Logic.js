// ------------------------------------- in out-
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';
// import {} from './mathFunction.js';
export {update,calculateRotation};
import TowerWorker from './workers/TowerWorker?worker';
const worker = new TowerWorker();
import ExplosionWorker from './workers/ExplosionWorker?worker';
const explWorker = new ExplosionWorker();

// ANIMATION FRAME -------------------->
function update() {
  if(store.animation){
  store.frameCount ++;
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTime;

  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato ------
  if (deltaTime >= store.intervalFrame) {

    // ON FRAME
      // pulisci army enemy & bullets
      // if(store.frameCount % 250 === 0 ){
      //   store.army = store.army.filter(soldier => soldier.alive);
      //   store.bullets = store.bullets.filter(bullet => !bullet.explode );
      //   console.warn('clean arrays');
      // }

      // push enemy
      if((store.frameCount % store.enemyFrequency(store.wavesCount) === 0 
          && store.waves[store.wavesCount].enemies > store.enemyCounter)){
        enemypush(store.enemyNumber(store.wavesCount));
      }
      // aggiorna cordinate enemy
      if(store.army.length > 0){
        store.army.forEach(soldier => {
          animazioneMovimentoVerticale(soldier);
        }); 
      }
      if(store.dead + store.kills === store.waves[store.wavesCount].enemies){
        console.log('ondata terminata');
        store.animation = false;
      };
      console.log(store.dead, store.kills, store.enemyCounter, 'waves', store.wavesCount +1)
      store.lastTime = currentTime;
    }
    // ----------------------------------------------------------------------------

    if(store.frameCount % 500 === 0){
      requestAnimationFrame(resetArrays);
    }else if (store.animation){
      // Richiedi un nuovo frame di animazione
      requestAnimationFrame(BulletUpdate);
    }
}
}

function BulletUpdate() {

  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeBullet ;
  
  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalBulletFrame) {

    // frequenza spara proiettile
    if((store.frameCount % store.bulletsFrequency()) === 0 ){
      newshot();
    }

    if(store.bullets){
      store.bullets.forEach(bullet => {
        bulletComputation(bullet, store.army);
      });
    }
    store.lastTimeBullet = currentTime;
  }
    // Richiedi un nuovo frame di animazione
    requestAnimationFrame(update);
}

function resetArrays(){

  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeReset;
  if (deltaTime >= store.intervalFrame) {
  store.frameCount = 0;
  console.warn('RESET COUNTER');
  store.lastTimeReset = currentTime;
}
requestAnimationFrame(update);
}
// ANIMATION FRAME --------------------<-------

function enemypush(numb){
  for (let index = 0; index < numb; index++) {
    store.enemyCounter ++;

    const newEnemy ={ 
      id:store.enemyCounter,
      cord : {x:rand(20,580), y:rand(-40, 0)},
      health:rand(store.waves[store.wavesCount].minMaxhealt[0],store.waves[store.wavesCount].minMaxhealt[1]), 
      speed: rand(store.waves[store.wavesCount].minMaxSpeed[0],store.waves[store.wavesCount].minMaxSpeed[1]),
      alive: true, 
    };

    store.army.push(newEnemy);
  }
}

function bulletComputation(bullet, army) {

    if(!bullet.explode){ // se il proiettile non è gia esploso

      if(!bullet.isDirected){ // solo se non direzionato calcoliamo la sua velocità di movimento 
          bullet.velXY = calcolaVelocitaMovimento(store.tower.rotation, bullet.velocity);
          bullet.isDirected = true;
          store.shotCounter ++;
      };
      // Calcola la nuova coordinata X e Y in base alla velocità AKA sposta il proiettile.
      bullet.cord.y += bullet.velXY.y ;
      bullet.cord.x += bullet.velXY.x ;
      // ridurre contatore autonomia proiettile
      bullet.autonomy -= (( Math.abs(bullet.velXY.x) + Math.abs(bullet.velXY.y)));
      if(bullet.autonomy < 1 ){ //se ha finito l autonomia si ferma e si calcola l esplosione
          bullet.stop= true;
          bullet.rady=true;
          calcolaDannoEsplosione(bullet, army);
          bullet.explode = true;
      };

      if(store.frameCount % 2 === 0){
          verificaCollisioneProiettile(bullet, army);
      };
    };
}

function verificaCollisioneProiettile(bullet, army) {

  const centroX = bullet.cord.x;
  const centroY = bullet.cord.y;
  const raggioAttivazione = bullet.radius;

  let armyBuffer = army.filter((enemy)=>{
    const distanzaX = Math.abs(centroX - enemy.cord.x);
    const distanzaY = Math.abs(centroY - enemy.cord.y);
    const distanza =  Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);

    return distanza <= raggioAttivazione;
  });

  if(armyBuffer.length > 0){
    bullet.stop= true;
    bullet.rady= true;
    
    for (const nemico of armyBuffer){
        if(nemico.alive){
        let deltaX =   nemico.cord.x - bullet.cord.x;
        let deltaY =   nemico.cord.y - bullet.cord.y;
        let distanza = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distanza <= bullet.radius) {
          //  enemy colpito

          if(store.frameCount % 2 === 0){
            calcolaDannoEsplosione(bullet,army);
          }
          break;
        }
      }
    }
  }
}


function calcolaDannoEsplosione(bullet, enemys) {
  // console.log('CALCOLO DANNO INVOCATO');
  // ------ send to worker ---------
  // const explWorker = new ExplosionWorker();

  const 
  noProxyArmy = JSON.parse(JSON.stringify(enemys)),
  noProxyBullet = JSON.parse(JSON.stringify(bullet));

  // console.log('NO PROXY MESSAGE',noProxyBullet,noProxyArmy, 'ENEMYES', enemys );

  explWorker.postMessage([noProxyBullet,noProxyArmy]);

  explWorker.addEventListener("message", function(event) {
    store.army = event.data;
    // console.log('CALCOLO DANNO MESSAGGIO RICEVUTO');
  });

  bullet.explode = true;
  // console.log('CALCOLO DANNO FINE');
}

function newshot(){
  const critical = probabilistcEngine(store.user.fortune);
  const nshot =
  {
  id: store.shotCounter,
  velocity:     store.bulletsVelocity(),
  damageRadius: store.bulletsDmgRadius() * critical ,
  damage :      store.bulletsDamage() * critical,
  cord : calcolaCordinataPartenzaProiettile(),
  isDirected: false,
  velXY: 0,
  autonomy: 900,
  radius: store.activationRadius, //activation radius
  rady: false,
  explode: false,
  erasable: false,
  critical:false,
  };
  if(critical > 1){
    // nshot.damageRadius = nshot.damageRadius * 1.3,
    nshot.critical = true;
  }
  store.bullets.push(nshot);
}

function calculateRotation() {


  let upgrade = setInterval(() => {
      worker.postMessage([store.tower.cord.x, store.tower.cord.y, mouseStore.mouse[0], mouseStore.mouse[1]]);
  }, 40);
  upgrade;

  worker.addEventListener("message", function(event) {
  store.tower.rotation = event.data;
});

}

function  animazioneMovimentoVerticale(enemy) {
  if(enemy.alive){
    const altezzaCampoBattaglia = 800; // Altezza del campo di battaglia
      if (enemy.health <= 0) {
        // console.warn('die', enemy.id),
        store.kills ++;
        enemy.alive= false;
        console.warn('kill', store.kills)
      
      }else if(enemy.cord.y > altezzaCampoBattaglia){
        store.user.health -= enemy.health / 4 ;
        store.dead ++;
        enemy.alive= false;
      }


      const velocitaMovimento =  enemy.speed; // Velocità di movimento in pixel per frame (puoi     regolare   il valore)
      enemy.cord.y += velocitaMovimento;
  }
};

 // Calcolo della velocità di movimento del proiettile
function calcolaVelocitaMovimento(angolo, velocita) {
  const angoloRad = (angolo - 90) * (Math.PI / 180); // Conversione in radianti
  const x = Math.cos(angoloRad) * velocita;
  const y = Math.sin(angoloRad) * velocita;
  return {x,y};
}

function calcolaCordinataPartenzaProiettile() {

  const angoloRotazione = store.tower.rotation; // Angolo di rotazione della torretta (in gradi)
  const raggio = 100; // Raggio dal centro di rotazione al punto di partenza del proiettile

  // Calcolo delle coordinate di partenza del proiettile
  const radian = (angoloRotazione - 90) * (Math.PI / 180); // Conversione dell'angolo in radianti
  const xPartenza = store.tower.cord.x + raggio * Math.cos(radian);
  const yPartenza = store.tower.cord.y + raggio * Math.sin(radian);

  return { x: xPartenza, y: yPartenza };
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
};


//  probabilistic engine 2: da 0 a point 1       probabilità in percentuale di colpi critici
//                          da point 1 a point 2 probabilità in percentuale di colpi dimezzati
//                          da point 2 a 100%    restante probabilità di colpi pieni
function probabilistcEngine(fortune){
  const i =  Math.floor(Math.random() * 100 + 1);
  
  if(i <= fortune){
    console.warn('CRITICO!')
    return 4;
  }else{
    return 1
  }
}
