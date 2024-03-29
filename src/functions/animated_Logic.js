// ------------------------------------- in out-
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';
import {sayWhichBoost, foleyShot, foleyExplosion, voxAssistantImpact,voxAssistantRejoices,voxAssistantRage, voxAssistantDanger,musicLowLoud} from './audio';
import {saveWaveCompleteStatistic,calculateAverange} from './game_Menagement';
// import {} from './mathFunction.js';
export {update,calculateRotation,stopRotation,rand};

import TowerWorker from './workers/TowerWorker?worker';
import ExplosionWorker from './workers/ExplosionWorker?worker';
const worker = new TowerWorker();
const explWorker = new ExplosionWorker();



// ANIMATION FRAME -------------------->
function update() {
  if(store.animation){
    store.frameCount ++;
    const currentTime = performance.now();
    const deltaTime = currentTime - store.lastTime;
    // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato ------
    if (deltaTime >= store.intervalFrame) {
        // aggiorna cordinate enemy
        if(store.army.length > 0){
          store.army.forEach(soldier => {
            animazioneMovimentoVerticale(soldier);
          }); 
        };
        // controlla se ondata è terminata
        if(store.dead + store.kills >= store.waves[store.wavesCount].enemies){
          stopRotation();
          if(store.autoShot){voxAssistantRejoices();}
          store.autoShot = false;
          
          // aspettare che boost termini
          if(!store.boosting){
            store.gameStatus.lastWave = store.wavesCount;
            store.animation = false;
            store.gameStatus.onMatch = false;
            store.army = [];
            store.bullets = [];

              if(store.userHealth <= 0){
                store.gameStatus.alive = false;
              }else{
                if(!store.gameStatus.statTaken){
                  saveWaveCompleteStatistic();
                }
                store.restartNumb = 0;
                if(store.wavesCount < 13 ){
                  store.gameStatus.upgradeAvailable = 3;
                }
              }
          }
        };

        if(store.gameStatus.surviveMode && store.userHealth < 0){

          if(!store.gameStatus.endGame){
            store.gameStatus.endGame = true;
            store.autoShot = false;
            store.gameStatus.alive = false;
            stopRotation();
            saveWaveCompleteStatistic();
            calculateAverange();
            musicLowLoud();
            store.graficFx = 5;
            let finalExplosio = setInterval(() => {
              foleyExplosion();
            }, 851);
            let finalExplosio2 = setInterval(() => {
              foleyExplosion();
            }, 320);
            finalExplosio;
            finalExplosio2;

            setTimeout(() => {
              clearInterval(finalExplosio);
              clearInterval(finalExplosio2);
              store.animation = false;
              store.gameStatus.onMatch = false;
            }, 20000);
          }
        }

        // push enemy
        if((store.frameCount % store.enemyFrequency(store.wavesCount) === 0 
            && store.waves[store.wavesCount].enemies > store.enemyCounter)){
          enemypush(store.enemyNumber(store.wavesCount));
        }
        store.lastTime = currentTime;
      };

      // Boost
      if(store.frameCount % 60 === 0 && store.userHealth <= 7500 && !store.boosting && store.gameStatus.alive){
        voxAssistantDanger();
        store.boosting = true;
      
        if(store.userHealth <= 3000){
          probabilisticBoostEngine(9.5,8000,1000);
        }else{

          if(store.userHealth <= 5000){
            probabilisticBoostEngine(5,5000,3000);
          }else{

              if(store.userHealth <= 8000){
                probabilisticBoostEngine(3,4000,6000);
              }
        }
      }
      };
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
    if((store.frameCount % store.bulletsFrequency()) === 0 && store.autoShot ){
      store.shotCounter ++;
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

function resetArrays(){ //obsolete

  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeReset;
  if (deltaTime >= store.intervalFrame) {
  store.frameCount = 0;
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
      cord : {x:rand(20,580), y:rand(-10, 0)},
      health:randDecimal(store.waves[store.wavesCount].minMaxhealt[0],store.waves[store.wavesCount].minMaxhealt[1]), 
      speed: randDecimal(store.waves[store.wavesCount].minMaxSpeed[0],store.waves[store.wavesCount].minMaxSpeed[1]),
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
      };
      // Calcola la nuova coordinata X e Y in base alla velocità AKA sposta il proiettile.
      bullet.cord.y += bullet.velXY.y ;
      bullet.cord.x += bullet.velXY.x ;
      // ridurre contatore autonomia proiettile
      bullet.autonomy -= (( Math.abs(bullet.velXY.x) + Math.abs(bullet.velXY.y)));
      if(bullet.autonomy < 1 ){ //se ha finito l autonomia si ferma e si calcola l esplosione
        calcolaDannoEsplosione(bullet, army);
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

    
    for (const nemico of armyBuffer){
        if(nemico.alive){
        let deltaX =   nemico.cord.x - bullet.cord.x;
        let deltaY =   nemico.cord.y - bullet.cord.y;
        let distanza = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distanza <= bullet.radius) {

          if(store.frameCount % 2 === 0){
            store.shotGoals ++;
            foleyExplosion();
            calcolaDannoEsplosione(bullet,army);
          }
          break;
        }
      }
    }
  }
}

function calcolaDannoEsplosione(bullet, enemys) {

  bullet.stop= true;
  bullet.rady= true;

  const 
  noProxyArmy = JSON.parse(JSON.stringify(enemys)),
  noProxyBullet = JSON.parse(JSON.stringify(bullet));

  explWorker.postMessage([noProxyBullet,noProxyArmy]);

  explWorker.addEventListener("message", function(event) {
    store.army = event.data;

  });

  bullet.explode = true;
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
  foleyShot(nshot.critical);
}

let upgradeAim ;
function calculateRotation() {

  upgradeAim = setInterval(() => {
      worker.postMessage([store.tower.cord.x, store.tower.cord.y, mouseStore.mouse[0], mouseStore.mouse[1]]);
  }, 40);
  upgradeAim;
  worker.addEventListener("message", function(event) {
  store.tower.rotation = event.data;
})
};

function stopRotation(){
  clearInterval(upgradeAim);
};

function  animazioneMovimentoVerticale(enemy) {
  if(enemy.alive){
    const altezzaCampoBattaglia = 800; // Altezza del campo di battaglia
      if (enemy.health <= 0) {
        enemy.alive= false;
        if(!store.gameStatus.surviveMode){
          store.kills ++;
        }else{
          store.kills ++;
          store.survivorKills ++;
        }
      
      }else if(enemy.cord.y > altezzaCampoBattaglia){
        voxAssistantImpact();
        store.userHealth -= enemy.health / 4 ;
        enemy.alive= false;
        store.dead ++;

        if(store.userHealth < (-400)){
          store.userHealth = (-400);
        }
      };
       // Velocità di movimento in pixel per frame (puoi     regolare   il valore)
      enemy.cord.y += enemy.speed;
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
  const raggio = 80; // Raggio dal centro di rotazione al punto di partenza del proiettile

  // Calcolo delle coordinate di partenza del proiettile
  const radian = (angoloRotazione - 90) * (Math.PI / 180); // Conversione dell'angolo in radianti
  const xPartenza = store.tower.cord.x + raggio * Math.cos(radian);
  const yPartenza = store.tower.cord.y + raggio * Math.sin(radian);

  return { x: xPartenza, y: yPartenza };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function randDecimal(min, max) {
  const number =(Math.random() * (max - min) + min).toFixed(1);
  return parseFloat(number);
};

//  probabilistic engine: da 0 a {fortune}  probabilità in percentuale di colpi critici
function probabilistcEngine(fortune){
  const i =  Math.floor(Math.random() * 100 + 1);
  
  if(i <= fortune){
    return 4;
  }else{
    return 1
  }
}

// motore assegnazione boost probabilistico
// luckMultiplier: moltiplica la fortuna quindi la probabilità di innesco del boost
// boostDuration: durata del boost
// boostGate:     riapertura della condizione che permette, se possibile, di provare ad invocare un boost
function  probabilisticBoostEngine(luckMultiplier, boostDuration, boostGate){
  
  if(probabilistcEngine(store.user.fortune * luckMultiplier) === 4){

    store.boostingTimeOut = boostDuration;
    const userOriginalState = JSON.parse(JSON.stringify(store.user));

    let choice;
    if(store.wavesCount < 15){
      choice = rand(1,5); // all ultima ondata boost health scartato
    }else{
      choice = rand(1,4); // all ultima ondata boost health scartato
    }

    switch (choice) {

      case 1:
        sayWhichBoost(choice); setTimeout(()=> {voxAssistantRage();},600);
        store.boostNameDisplay = 'MachineGun';
        store.user.rateOfFire = store.specialBoost.bulletsFrequency.rateOfFire;
        store.user.bulletsVelocity = store.specialBoost.bulletsFrequency.bulletsVelocity;
        setTimeout(() => {
          store.user = userOriginalState;
          store.boostingTimeOut = 0;
          store.boostNameDisplay = 'WaitBoost';
              setTimeout(() => {store.boosting = false;}, boostGate);
        }, boostDuration);
        break;

      case 2:
        sayWhichBoost(choice); setTimeout(()=> {voxAssistantRage();},600);
        store.boostNameDisplay = 'AllCritical';
        store.user.fortune = store.specialBoost.allCritical.fortune;
        setTimeout(() => {
          store.boostingTimeOut = 0;
          store.user = userOriginalState;
          store.boostNameDisplay = 'WaitBoost';
              setTimeout(() => {store.boosting = false;}, boostGate);
        }, boostDuration);
        break;

      case 3:
        sayWhichBoost(choice); setTimeout(()=> {voxAssistantRage();},600);
        store.boostNameDisplay = 'SuperShot';
        store.user.damage = store.specialBoost.superShot.damage;
        store.user.bulletsVelocity = store.specialBoost.superShot.bulletsVelocity;
        store.activationRadius = store.specialBoost.superShot.activationRadius;
        setTimeout(() => {
          store.boostingTimeOut = 0;
          store.user = userOriginalState;
          store.activationRadius = 30;
          store.boostNameDisplay = 'WaitBoost';
              setTimeout(() => {store.boosting = false;}, boostGate);
        }, boostDuration);
        break;

      case 4:
        sayWhichBoost(choice); setTimeout(()=> {voxAssistantRage();},600);
        store.boostNameDisplay = 'Health+Mg';
        store.userHealth += 500;
        store.user.rateOfFire = store.specialBoost.bulletsFrequency.rateOfFire;
        store.user.bulletsVelocity = store.specialBoost.bulletsFrequency.bulletsVelocity;
        setTimeout(() => {
          store.boostingTimeOut = 0;
          store.user = userOriginalState;
          store.boostNameDisplay = 'WaitBoost';
              setTimeout(() => {store.boosting = false;}, boostGate);
        }, boostDuration);
        break;

        default: store.boosting = false;
    }

  }else{store.boosting = false;}
}
