import {store} from '../data/store';
import {sayWhichwave,playMusic,musicFinalWaveFade,voxAssistantFinal} from './audio';
import {update,calculateRotation,stopRotation} from './animated_Logic';
export {startBattle,restart, upGradeUser, deactiveMouseAim, saveWaveCompleteStatistic,calculateAverange};

function startBattle(){
  store.wavesCount ++;
  sayWhichwave(store.wavesCount + 1);
  store.gameStatus.statTaken = false;
  store.totalshotCounter += store.shotCounter;
  store.shotCounter = 0;
  store.shotGoals = 0;
  store.kills = 0;
  store.dead = 0;
  store.enemyCounter = 0;
  store.army= [];
  store.bullets = [];
  store.animation = true;
  store.gameStatus.onMatch = true;
  activeMouseAim();

  if(store.wavesCount === 0){
    playMusic(0);
  }else if (store.wavesCount === 6) {
    playMusic(232.02);
  }else if (store.wavesCount === 10) {
    playMusic(488.02);
  }else if (store.wavesCount === 13) { // final
    playMusic(648.02);
    store.graficFx = 1;
    setTimeout(()=>{
      voxAssistantFinal(1);
    },1500)
    setTimeout(()=>{ // incomincia a ruotare il colore
      store.graficFx = 2;
    },80000)

    setTimeout(()=>{ // timeout prima ondata
      store.wavesCount ++;
      store.frameCount = 0;
      store.autoShot = false;
      store.bullets = [];
      store.army = [];
      setTimeout(()=>{
        voxAssistantFinal(2);
      },20000)


      let blockFrameCount = setInterval(() => { // impedisco di arrivare all enemyfrequency
        if(store.frameCount > 20)
        store.army = [];
        store.frameCount = 0;
      }, 5);
      setTimeout(() => {
        store.bullets = [];
      }, 15000);

      setTimeout(() => { // timeout seconda ondata
        clearInterval(blockFrameCount);
        setTimeout(() => {
          store.autoShot = true;
          store.graficFx = 3;
        }, 24);
      }, 31000);

      setTimeout(() => { //si attiva survivor mode la partita finisce quando arrivi a 0 vita
        store.graficFx = 4;
        store.gameStatus.surviveMode = true;
        console.warn('survivorMode');
        store.wavesCount ++;
        store.army = [];
        store.userHealth += 2500;
      }, 128000); 

    },160000)
  }


  if(store.wavesCount < 13){ // final
    setTimeout(() => {
      update();
      store.autoShot = true;
    }, 1000);
  }else{
    setTimeout(() => {
      update();
      store.boosting = true;
          setTimeout(() => {
            store.boosting = false;
            store.autoShot = true;
          },10000)
    }, 22000);
  }
}
function restart(){
  store.restartNumb ++;
  store.user.rateOfFire = 0;
  store.user.bulletsVelocity = 0;
  store.user.explosionRadius = 0;
  store.user.damage = 0;
  store.user.fortune = 1;
  store.userHealth = 1500;
  store.activationRadius = 30;
  store.wavesCount --;
  store.gameStatus.alive = true;

  if(store.wavesCount < 13 && store.wavesCount !== - 1){
    store.gameStatus.upgradeAvailable = (3 * (store.wavesCount + 1)) ;
  }else if(store.wavesCount > 13 ){
    store.gameStatus.upgradeAvailable = 39;
  }
}

function stopBattle(){
  store.animation = false;
}

function activeMouseAim(){
  calculateRotation();
}

function deactiveMouseAim(){
stopRotation()
}

function upGradeUser(key){
  switch (key) {
    case 'rateOfFire':
      console.log('rateOfFire max 13')
      store.user.rateOfFire += 1;
      store.gameStatus.upgradeAvailable --;
      break;
    case 'bulletsVelocity':
      console.log('bulletsVelocity max 8')
      store.user.bulletsVelocity += 2;
      store.gameStatus.upgradeAvailable --;
      break;
    case 'explosionRadius':
      console.log('explosionRadius max 40')
      store.user.explosionRadius += 10;
      store.activationRadius += 2;
      store.gameStatus.upgradeAvailable --;
      break;
    case 'damage':
      console.log('damage max 360')
      store.user.damage += 40;
      store.gameStatus.upgradeAvailable --;
      break;
    case 'fortune':
      console.log('fortune max 10')
      store.user.fortune += 1;
      store.gameStatus.upgradeAvailable --;
      break;
  }
}

function saveWaveCompleteStatistic(){
  let statistic = {
    kills: store.kills, 
    totalEnemies: store.enemyCounter, 
    dead: store.dead, 
    precision: parseFloat(((store.shotGoals / store.shotCounter) * 100).toFixed(1)), 
    restartNumb: store.restartNumb,
  }
    store.wavesComplete.push(statistic);
    store.gameStatus.statTaken = true;
    console.log('statistic',store.wavesComplete);
}

function calculateAverange(){
  console.log('calculate media')
  let killsSum = 0 ,deadSum = 0, precisionSum = 0, totalEnemiesSum = 0, retrySum = 0, precisionAverange = 0;

  for (let index = 0; index < store.wavesComplete.length; index++) {
      killsSum +=        store.wavesComplete[index].kills;
      deadSum +=         store.wavesComplete[index].dead;
      precisionSum +=    store.wavesComplete[index].precision;
      totalEnemiesSum += store.wavesComplete[index].totalEnemies;
      retrySum +=        store.wavesComplete[index].restartNumb;
  }

  precisionAverange = Math.floor(precisionSum / store.wavesComplete.length);
  store.precisionAverange = precisionAverange;

  store.wavesCompletTot.kills =             killsSum;
  store.wavesCompletTot.dead =              deadSum;
  store.wavesCompletTot.precisionAverange = precisionAverange.toString() + ' ' + '%';
  store.wavesCompletTot.totalEnemies =      totalEnemiesSum;
  store.wavesCompletTot.restartNumb =       retrySum;
  calculateScore();
}

function calculateScore(){

  store.killsPoint = Math.floor(store.wavesCompletTot.kills * 0.2) ;
  store.survivorKillsPoint = store.survivorKills * 5;
  store.deadPoint = -(store.wavesCompletTot.dead * 1.25);
  store.precisionPoint = store.precisionAverange * 2;
  store.retrySum = -(store.wavesCompletTot.restartNumb * 20);
  store.finalScore = store.killsPoint + store.survivorKillsPoint + store.deadPoint + store.precisionPoint + store.retrySum;

  console.log(store.killsPoint , store.survivorKillsPoint , Math.floor(store.deadPoint) , store.precisionPoint , store.retrySum)
  console.log('calculate score', store.finalScore);
}