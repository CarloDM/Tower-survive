import {reactive} from 'vue';
export const store = reactive ({

  tower : {
          cord : {x:300,y:560},
          rotation : 0,
          aim: false,
          attak: 1},
  
  enemyCounter: 0,
  army : [
    // {cord : {x:150,y:20}, id:0,
    // health: 1000, alive: true,}
  ],

  shotCounter:0,
  bullets:[
    // {
    //   id: 0,
    //   cord : {x:300,y:520},
    //   timeout: 50,
    //   radius: 100,
    //   velocity: 10,
    //   damage : 80,
    //   damageRadius: 98,
    //   explode: false,
    //   stop:false,
    //   autonomy: 650,
    //   rady: false,
    //   }
  ],

  autoShot: false,
  autoAim: false,
  manualAim: false,
  kills: 0,
  money: 0,
  dead:0,


  // utiliti
  checkDivider : true,
  userShoting : false,

  // animation frame
  lastTime : 0,
  lastTimeBullet : 0,
  lastTimeReset : 0,
  intervalFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  intervalBulletFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  shotTimeCounter : 0,
  enemyfreq: 0,
  frameCount: 0,
  collisionfreq: 0,
  resetTime: 0,
  armyBuffer:[],
})