
// ------------------------------------- in out-
import {store} from '../data/store';
// import {} from './mathFunction.js';

export {update,wor};

// main.js
// import Worker from './workers/Worker';
function wor(){
  
  const worker = new Worker('./workers/Worker');

  worker.postMessage(10); // Invia dati al Worker
  
  worker.onmessage = function(event) {
    const result = event.data;
    console.log(result); // Stampa il risultato ricevuto dal Worker
  };
  // worker.postMessage(data);
  // --------------
}



// ANIMATION FRAME -------------------->
function update() {
  store.frameCount ++;
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTime;

  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalFrame) {

    // ON FRAME
      calculateRotation();
      if(store.army.length > 4 ){
        store.army = store.army.filter(soldier => soldier.alive);
      }

      
      store.enemyfreq ++
      if(store.enemyfreq % 20 === 0){
        enemypush(2);
      }
      
        store.army.forEach(soldier => {
          animazioneMovimentoVerticale(soldier);
        }); 

      
      
      // if(store.enemyfreq % 500 === 0){
      //   store.army = [];
      // };



      store.bulletLostCheck ++
      if(store.bulletLostCheck  % 91 === 0){
      store.bullets.forEach(bullet => {
        checkBullet(bullet, store.army);
      });
    }
    store.resetTime ++
    // if(store.resetTime % 1001 === 0){
    //   requestAnimationFrame(resetArrays);
    // }else{
    // }
    
    // if(store.resetTime % 1000 === 0){
      //   store.shotCounter = 0,
      //   store.enemyCounter = 0,
      //   store.resetTime = 0;
      //   store.shotTimeCounter =  0;
      //   store.enemyfreq =  0;
      //   store.frameCount = 0;
      //   store.collisionfreq =  0;
      //   store.army = [];
      //   store.bullets = [];
      // }
      // Aggiorna il tempo di riferimento all'istante attuale
      // console.log(store.frameCount,'FRamE tower', currentTime, store.lastTime,'perfrmance now:', performance.now());
      
      store.lastTime = currentTime;
    }
    if(store.resetTime % 1800 === 0){
      requestAnimationFrame(resetArrays);
    }else{
      // Richiedi un nuovo frame di animazione
      requestAnimationFrame(BulletUpdate);
    }
}


function resetArrays(){
  store.frameCount ++;
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
  console.warn('RESET MEMORY');
  console.warn('RESET MEMORY');
  console.warn('RESET MEMORY');
  console.warn('RESET MEMORY');
  console.warn('RESET MEMORY');
  store.resetTime ++
  store.lastTimeReset = currentTime;
}
requestAnimationFrame(update);
}

function BulletUpdate() {
  store.frameCount ++;
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeBullet ;
  
  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalBulletFrame) {

    calculateRotation();
    // Logica da eseguire
    store.shotTimeCounter ++
    if((store.shotTimeCounter % 6) === 0 ){
      newshot();
    }

    if((store.shotTimeCounter % 600) === 0 ){
      store.bullets = [];
    }

    if(store.bullets.length > 0){
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
// ANIMATION FRAME --------------------<-------

function enemypush(numb){
  for (let index = 0; index < numb; index++) {
    store.enemyCounter ++;
    const newEnemy =
          {cord : {x:150,y:0}, id:0,
          health: 5000, alive: true,};
          newEnemy.cord = {x:rand(50,550),y:rand(-160, -50)};
          newEnemy.id = store.enemyCounter;

          store.army.push(newEnemy);
          // animazioneMovimentoVerticale(store.army[store.army.length - 1])
          ;
  }}
function checkBullet(bullet,army){
    bullet.count;
  // let count = 0;
    bullet.countStop;
  // let countStop = 0;
        // ----------------------------------------
    // interruzione spostamento in caso di collisione o fine pixel massimi percorribii
    if (bullet.stop || bullet.autonomy < 1 || bullet.autonomy > bullet.autonomy * 2 ){

      bullet.countStop ++;
      
      bullet.cord.x = bullet.cord.x;
      bullet.cord.y = bullet.cord.y;
      let explodeDalay = setTimeout(() => {
        bullet.explose = true;
        // clearInterval(shot);

        // bullet.countStop ++;
        // console.log('clear interval',count,countStop);
        // if(bullet.count === bullet.countStop ){

          // console.log('ultimo',bullet.count,bullet.countStop);

          calcolaDannoEsplosione(bullet, army); 
        // }
      }, bullet.timeout);
    }
}

function bulletComputation(bullet, army) {

    if(!bullet.isDirected){
        bullet.velXY = calcolaVelocitaMovimento(store.tower.rotation, bullet.velocity);
        bullet.isDirected = true;
        store.shotCounter ++;
    }

      // Calcola la nuova coordinata Y in base alla velocità
      bullet.cord.y += bullet.velXY.y ;
      bullet.cord.x += bullet.velXY.x ;
      // contatore dissipazione
      bullet.autonomy -=  -((bullet.velXY.x + bullet.velXY.y)) ;
      store.collisionfreq ++
      if(store.enemyfreq % 2 === 0){
        verificaCollisioneProiettile(bullet, army);
      }

}
function verificaCollisioneProiettile(bullet, nemici) {
  // let nemiciColpiti = [];

  // console.log('verifica collisione')

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
      // console.log(nemico.id, distanza,  bullet.radius );
      if (distanza <= bullet.radius) {
        // nemiciColpiti.push(nemico.id);
        console.warn('colpito bersaglio id:', nemico.id);
        bullet.stop= true;
        bullet.rady=true;
        calcolaDannoEsplosione(bullet,nemici);
        break;
        // return true; 
      }}
    }

  }


}

function calcolaDannoEsplosione(bullet, enemys) {
  const centroX = bullet.cord.x;
  const centroY = bullet.cord.y;
  const raggioEsplosione = bullet.damageRadius;

  let armyBuffer = enemys.filter((enemy)=>{
    const distanzaX = Math.abs(centroX - enemy.cord.x);
    const distanzaY = Math.abs(centroY - enemy.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);
    return distanza <= raggioEsplosione;
  });

  armyBuffer.forEach((nemico) => {
    const distanzaX = Math.abs(centroX - nemico.cord.x);
    const distanzaY = Math.abs(centroY - nemico.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);
    if (distanza <= raggioEsplosione) {
      if(nemico.health > 0){
      const dannoInflitto = bullet.damage * (1 - distanza / raggioEsplosione);
      nemico.health -= dannoInflitto;
      console.log('colpito id', nemico.id, parseInt(nemico.health) , 'danno inflitto', parseInt(dannoInflitto));
    }}

  });
  enemys.forEach((enemy) => {
    const index = store.army.indexOf(enemy);
    if (index !== -1) {
      store.army[index] = enemy;
    }
  });

  bullet.explode = true;
  let endExplosion = setTimeout(() => {
  bullet.explode = false;
  // delete store.bullets.shift();
  store.bullets = store.bullets.filter(item => item.id !== bullet.id);
  // bullet.$destroy(); // Distruggi il componente proiettile
  
  }, 200);
}

function newshot(){
  // store.shotCounter ++;
  const nshot =
  {
  id: 0,
  cord : {x:300,y:560},
  timeout: 1,
  radius: 80,
  velocity:13,
  damage : 20000,
  damageRadius: 160,
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
  // return nshot;

}

function calculateRotation() {
  // const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
  // const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
  // const oggettoX = store.mouse[0]; /* Coordinata X dell'oggetto nemico */
  // const oggettoY = store.mouse[1];/* Coordinata Y dell'oggetto nemico */

  calcolaAngolo(store.tower.cord.x,store.tower.cord.y,store.mouse[0],store.mouse[1]);
  function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
  const deltaX = oggettoX - torrettaX;
  const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate

  let angoloInRadianti = Math.atan2(deltaY, deltaX);
  let angoloInGradi = angoloInRadianti * (180 / Math.PI);

  // Adatta l'angolo in base al sistema di coordinate desiderato
  angoloInGradi = (450 - angoloInGradi) % 360;
  // console.log(angoloInGradi);
  store.tower.rotation = angoloInGradi;
}
}

function  animazioneMovimentoVerticale(enemy) {
  if(enemy.alive){
  const altezzaCampoBattaglia = 520; // Altezza del campo di battaglia

    const velocitaMovimento =  3; // Velocità di movimento in pixel per frame (puoi regolare   il valore)

      // let interval = setInterval(() => {
      // Calcola la nuova coordinata Y in base alla velocità
      enemy.cord.y += velocitaMovimento;
      // enemy.cord.x += 0 ;
      // console.log(store.enemy.cord.y)


        if (enemy.health < 1) {
          console.warn('die', enemy.id)
          // clearInterval(interval);
          enemy.alive= false;
          store.kills ++;
          // stopTower();
          // stopTower();
          // let soldierIsDying = setTimeout(() => {
          //   store.army = store.army.filter(item => item.id !== enemy.id);
          //   }, 500);
        }else if(enemy.cord.y > altezzaCampoBattaglia){
          // clearInterval(interval);
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
  return {
    x,
    y
  };
}

function rand(min, max) {
  return Math.random() * (max - min) + min;};

