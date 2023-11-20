import {store} from '../data/store';
import {sayWhichwave,playMusic,musicFinalWaveFade} from '../functions/audio';
import {update,calculateRotation,stopRotation} from '../functions/animated_Logic';
export {startBattle,upGradeUser, deactiveMouseAim, saveLastUserStatus};

function startBattle(){
  store.wavesCount ++;

  if(store.wavesCount === 0){
    playMusic(0);
  }else if (store.wavesCount === 6) {
    playMusic(232.02);
  }else if (store.wavesCount === 10) {
    playMusic(488.02);
  }else if (store.wavesCount === 13) { // final
    playMusic(648.02);
    setTimeout(()=>{
      store.wavesCount ++;
      store.frameCount = 0;
      store.army = [];
      store.autoShot = false;

      let blockFrameCount = setInterval(() => { // impedisco di arrivare all enemyfrequency
        if(store.frameCount > 20)
        store.frameCount = 0;
      }, 5);
      setTimeout(() => {
        store.bullets = [];
      }, 500);
      setTimeout(() => {
        clearInterval(blockFrameCount);
        setTimeout(() => {
          store.autoShot = true;
        }, 24);
      }, 31000);

      setTimeout(() => { // dopo 1min e 30sec si attiva survivor mode la partita finisce quando arrivi a 0 vita
        store.gameStatus.surviveMode = true;
        console.warn('survivorMode');
        store.wavesCount ++;
        store.army = [];
        store.userHealth += 2500;
      }, 128000); 

    },160000)
  }
  sayWhichwave(store.wavesCount + 1);
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

  if(store.wavesCount < 13){ // final
    setTimeout(() => {
      update();
      store.autoShot = true;
    }, 1000);
  }else{
    setTimeout(() => {
      update();
          setTimeout(() => {
            store.autoShot = true;
          },10000)
    }, 22000);
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

function saveLastUserStatus(){
  store.lastUserStatus.user = JSON.parse(JSON.stringify(store.user));
  store.lastUserStatus.userHealth = JSON.parse(JSON.stringify(store.userHealth));
  store.lastUserStatus.activationRadius = JSON.parse(JSON.stringify(store.activationRadius));
  console.log(store.lastUserStatus);
}