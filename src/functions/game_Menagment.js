import {store} from '../data/store';
import {sayWhichwave} from '../functions/audio';
import {update,calculateRotation,stopRotation} from '../functions/animated_Logic';
export {startBattle,upGradeUser, deactiveMouseAim, saveLastUserStatus};

function startBattle(){
  store.wavesCount ++;
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
  setTimeout(() => {
    update();
    store.autoShot = true;
  }, 1000);
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