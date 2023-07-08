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
      if(store.army.length > 4 ){
        store.army = store.army.filter(soldier => soldier.alive);
      }

      // push enemy
      if(store.frameCount % 20 === 0){
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
    }else{
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
    if((store.frameCount % 14) === 0 ){
      newshot();
    }

    // reset array proiettile OBSOLETO
    // if((store.frameCount % 600) === 0 ){
    //   store.bullets = [];
    // }
  
    // 
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

    if(!bullet.explode){

      if(!bullet.isDirected){
          bullet.velXY = calcolaVelocitaMovimento(store.tower.rotation, bullet.velocity);
          bullet.isDirected = true;
          store.shotCounter ++;
      }

        // Calcola la nuova coordinata Y in base alla velocità
        bullet.cord.y += bullet.velXY.y ;
        bullet.cord.x += bullet.velXY.x ;
        // contatore dissipazione
        bullet.autonomy -= (( Math.abs(bullet.velXY.x) + Math.abs(bullet.velXY.y))) ;

        if(store.enemyfreq % 2 === 0){
          verificaCollisioneProiettile(bullet, army);
        }
      // console.warn('bullet computation', bullet.id);
    }
}

function verificaCollisioneProiettile(bullet, nemici) {

  const centroX = bullet.cord.x;
  const centroY = bullet.cord.y;
  const raggioEsplosione = bullet.damageRadius;

  let armyBuffer = nemici.filter((enemy)=>{
    const distanzaX = Math.abs(centroX - enemy.cord.x);
    const distanzaY = Math.abs(centroY - enemy.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);

    return distanza <= raggioEsplosione;
  });

  if(armyBuffer.length > 0){
    for (const nemico of armyBuffer)  {
      if(nemico.alive){
      let deltaX = nemico.cord.x - bullet.cord.x;
      let deltaY = nemico.cord.y - bullet.cord.y;
      let distanza = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanza <= bullet.radius) {
        console.warn('colpito bersaglio id:', nemico.id);
        bullet.stop= true;
        bullet.rady=true;

        if(store.frameCount % 2 === 0){
          calcolaDannoEsplosione(bullet,nemici);
        }
        break;
      }}
    }
  }


}

function calcolaDannoEsplosione(bullet, enemys) {

  // ------ send to worker ---------
  const explWorker = new ExplosionWorker();

  let 
  noProxyArmy = JSON.parse(JSON.stringify(enemys)),
  noProxyBullet = JSON.parse(JSON.stringify(bullet));
  // console.log( 'tradotto ', noProxyBullet);

  explWorker.postMessage([noProxyBullet,noProxyArmy]);

  explWorker.addEventListener("message", function(event) {
    store.army = event.data;
    console.log('army modificato', store.army);
  });
  
  bullet.explode = true;
  let endExplosion = setTimeout(() => {
  // bullet.explode = false;
  // delete store.bullets.shift();
  store.bullets = store.bullets.filter(item => item.id !== bullet.id);
  // bullet.$destroy(); // Distruggi il componente proiettile
  }, 200);
}

function newshot(){
  const nshot =
  {
  id: 0,
  cord : calcolaCordinataPartenzaProiettile(),
  timeout: 200,
  radius: 30,
  velocity: 30,
  damage : 400,
  damageRadius: 80,
  explode: false,
  stop:false,
  autonomy: 400,
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
  // const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
  // const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
  // const oggettoX = store.mouse[0]; /* Coordinata X dell'oggetto nemico */
  // const oggettoY = store.mouse[1];/* Coordinata Y dell'oggetto nemico */
  const worker = new MyWorker()
  let upgrade = setInterval(() => {
      worker.postMessage([store.tower.cord.x, store.tower.cord.y, mouseStore.mouse[0], mouseStore.mouse[1]]);
  }, 20);
  upgrade;

  worker.addEventListener("message", function(event) {
	// console.log(event.data);
  store.tower.rotation = event.data;
  console.log('rotazione gradi',store.tower.rotation )
});

//   calcolaAngolo(store.tower.cord.x,store.tower.cord.y,store.mouse[0],store.mouse[1]);
//   function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
//   const deltaX = oggettoX - torrettaX;
//   const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate

//   let angoloInRadianti = Math.atan2(deltaY, deltaX);
//   let angoloInGradi = angoloInRadianti * (180 / Math.PI);

//   // Adatta l'angolo in base al sistema di coordinate desiderato
//   angoloInGradi = (450 - angoloInGradi) % 360;
//   // console.log(angoloInGradi);
  // store.tower.rotation = angoloInGradi;
// }
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
  

