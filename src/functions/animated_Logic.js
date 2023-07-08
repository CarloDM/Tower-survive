// ------------------------------------- in out-
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';
// import {} from './mathFunction.js';
export {update,calculateRotation};
import MyWorker from './workers/Worker?worker';
import ExplosionWorker from './workers/ExplosionWorker?worker';

// ANIMATION FRAME -------------------->
function update() {
  store.frameCount ++;
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTime;

  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato ------
  if (deltaTime >= store.intervalFrame) {

    // ON FRAME
      // pulisci army enemy
      if(store.frameCount % 100 === 0 ){
        store.army = store.army.filter(soldier => soldier.alive);
        store.bullets = store.bullets.filter(bullet => !bullet.explode );
        
      }

      // push enemy
      if(store.frameCount % 5 === 0){
        enemypush(2);
      }

      // aggiorna cordinate enemy
      if(store.army.length > 0){
        store.army.forEach(soldier => {
          animazioneMovimentoVerticale(soldier);
        }); 
      }

    store.resetTime ++
    store.lastTime = currentTime;
    }
    // ----------------------------------------------------------------------------

    if(store.frameCount % 2000 === 0){
      requestAnimationFrame(resetArrays);
    }else if (store.animation){
      // Richiedi un nuovo frame di animazione
      requestAnimationFrame(BulletUpdate);
    }
}

function BulletUpdate() {

  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeBullet ;
  
  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalBulletFrame) {

    // frequenza spara proiettile
    if((store.frameCount % 4) === 0 ){
      newshot();
    }

    if(store.bullets){
      store.bullets.forEach(bullet => {
        bulletComputation(bullet,store.army);
      });
    }
    store.resetTime ++
    // Aggiorna il tempo di riferimento all'istante attuale
    store.lastTimeBullet = currentTime;

    // console.log(store.frameCount,'FRamE proiettile', currentTime, store.lastTimeBullet ,'perfrmance now:', performance.now());
  }
    // Richiedi un nuovo frame di animazione
    requestAnimationFrame(update);
}

function resetArrays(){

  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeReset;
  if (deltaTime >= store.intervalFrame) {
  store.resetTime = 0,
  store.shotTimeCounter =  0;
  store.enemyfreq =  0;
  store.frameCount = 0;
  store.collisionfreq =  0;
  store.army = [];
  store.bullets = [];
  store.tower.rotation = 0;
  console.warn('RESET MEMORY');
  store.resetTime ++
  store.lastTimeReset = currentTime;
}
requestAnimationFrame(update);
}
// ANIMATION FRAME --------------------<-------

function enemypush(numb){
  for (let index = 0; index < numb; index++) {
    store.enemyCounter ++;
    const newEnemy =
          {cord : {x:150,y:0}, id:0,
          health: 500, alive: true, speed: 1,};

          newEnemy.cord = {x:rand(50,550), y:rand(-40, 0)};
          newEnemy.speed = rand(0.4, 1.7);
          newEnemy.id = store.enemyCounter;
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
      };

      if(store.enemyfreq % 2 === 0){
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
          console.log('colpito nemico id:', nemico.id);

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

  // ------ send to worker ---------
  const explWorker = new ExplosionWorker();

  const 
  noProxyArmy = JSON.parse(JSON.stringify(enemys)),
  noProxyBullet = JSON.parse(JSON.stringify(bullet));
  // console.log( 'tradotto ', noProxyBullet);

  explWorker.postMessage([noProxyBullet,noProxyArmy]);

  explWorker.addEventListener("message", function(event) {
    store.army = event.data;
    console.log('explosion worker done', store.army);
  });
  
  bullet.explode = true;

}

function newshot(){
  const nshot =
  {
  id: 0,
  cord : calcolaCordinataPartenzaProiettile(),
  // timeout: 200,
  radius: 30,
  velocity: 25,
  damage : 10,
  damageRadius: store.bulletsDmgRadius,
  explode: false,
  stop:false,
  autonomy: 700,
  rady: false,
  count : 0,
  countStop : 0,
  isDirected: false,
  velXY: 0,
  life: 0,
  
  };
  nshot.id = store.shotCounter;
  store.bullets.push(nshot);
}

function calculateRotation() {

  const worker = new MyWorker()
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

    const velocitaMovimento =  enemy.speed; // Velocità di movimento in pixel per frame (puoi regolare   il valore)

      enemy.cord.y += velocitaMovimento;

        if (enemy.health < 1) {
          // console.warn('die', enemy.id),
          enemy.alive= false;
          store.kills ++;

        }else if(enemy.cord.y > altezzaCampoBattaglia){
          enemy.alive= false;
          store.dead++;
        }
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
    return Math.random() * (max - min) + min;};
  

