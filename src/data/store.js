import {reactive} from 'vue';
export const store = reactive ({

// rinominare in inglese pulire logiche e funzioni
// produrre sound design -- aggiustamenti vocal - due suonini per i tast
// capire cache

  tower : {
    cord : {x:300,y:880},
    rotation : 0,
    aim: false,
  },

// enemies
  army : [],
  enemyNumber:    function(waveNumber){return this.waves[waveNumber].enemyNumber;}, // n nemici
  enemyFrequency: function(waveNumber){return this.waves[waveNumber].frequency;}, // ogni n  frame 

// waves
waves:[
  // {enemies:200,   frequency:12,  enemyNumber:1,  minMaxSpeed:[0.1,14], minMaxhealt:[250,4000]},    //0 TEST different enemy
  {enemies:5,   frequency:12,  enemyNumber:1,  minMaxSpeed:[0.9,1.5], minMaxhealt:[250,400]},    //1
  {enemies:5,   frequency:24,  enemyNumber:1,  minMaxSpeed:[0.9,1.8], minMaxhealt:[350,500]},    //2
  {enemies:12,  frequency:44,  enemyNumber:2,  minMaxSpeed:[1,1.8],   minMaxhealt:[400,600]},    //3 
  {enemies:16,  frequency:42,  enemyNumber:2,  minMaxSpeed:[1,2],     minMaxhealt:[400,650]},    //4 
  {enemies:24,  frequency:80,  enemyNumber:3,  minMaxSpeed:[1.4,2.0], minMaxhealt:[400,680]},    //5 

  {enemies:30,  frequency:78,  enemyNumber:3,  minMaxSpeed:[1.0,2.2], minMaxhealt:[500,680]},    //6 
  {enemies:60,  frequency:24,  enemyNumber:1,  minMaxSpeed:[0.6,2.6], minMaxhealt:[500,750]},    //7

  {enemies:70,  frequency:48,  enemyNumber:2,  minMaxSpeed:[0.8,2.6], minMaxhealt:[500,800]},    //8
  {enemies:70,  frequency:42,  enemyNumber:2,  minMaxSpeed:[0.6,2.8], minMaxhealt:[580,940]},    //9 
  {enemies:72,  frequency:60,  enemyNumber:3,  minMaxSpeed:[1,3.2],   minMaxhealt:[850,1000]},   //10  
  {enemies:70,  frequency:20,  enemyNumber:1,  minMaxSpeed:[1,3.5],   minMaxhealt:[900,1200]},   //11 
  {enemies:90,  frequency:12,  enemyNumber:1,  minMaxSpeed:[1,3.5],   minMaxhealt:[1000,1500]},  //12
  {enemies:110, frequency:12,  enemyNumber:1,  minMaxSpeed:[1,4],     minMaxhealt:[1200,2000]},  //13

  {enemies:160, frequency:200, enemyNumber:7,  minMaxSpeed:[0.6,1.3], minMaxhealt:[7000,9000]}, //14
  {enemies:334, frequency:24,  enemyNumber:1,  minMaxSpeed:[7,12],    minMaxhealt:[700,1300]},   //15
  {enemies:600, frequency:12,  enemyNumber:1,  minMaxSpeed:[9,14],    minMaxhealt:[750,900]},   //16
],

// bullets ---------------------
/** EXEMPL
    bullets:[
      {id: 0, velocity:     store.bulletsVelocity,
      damageRadius: store.bulletsDmgRadius,
      damage :      store.bulletsDamage,
      cord : calcolaCordinataPartenzaProiettile(),
      isDirected: false,
      velXY: 0,
      autonomy: 900,
      radius: 30, //activation radius
      rady: false,
      explode: false,
      erasable: false,
      }
    ]
 */
  bullets:[],
  bulletsFrequency: function(){return 20 - this.user.rateOfFire;},
  bulletsVelocity:  function(){return 10 + this.user.bulletsVelocity;},
  bulletsDmgRadius: function(){return 30 + this.user.explosionRadius;},
  bulletsDamage:    function(){return 40 + this.user.damage;},
// user stat
user:{
  rateOfFire : 0,
  bulletsVelocity: 0,
  explosionRadius: 0,
  damage:0,
  fortune:1,
},
  userHealth: 10000,
  activationRadius: 30,

// SPECIAL EVENT
boosting:false,
boostingTimeOut: false,
boostNameDisplay: '...',
specialBoost: {
  bulletsFrequency :{  
      rateOfFire : 16,
      bulletsVelocity: 14,
  } ,
  allCritical :{
      fortune: 85,
  },
  superShot :{
      damage: 4000,
      bulletsVelocity: 20,
      activationRadius : 50,
  } 
},

// counter -----------
  wavesCount: -1,
  enemyCounter: 0,
  shotCounter:0,
  totalshotCounter:0,
  shotGoals : 0,
  kills: 0,
  survivorKills:0,
  dead: 0,
  restartNumb: 0,

 // utility
  autoShot: false,
  graficFx: 0,

// animation frame
  frameCount: 0,
  animation: false,
  lastTime : 0,
  lastTimeBullet : 0,
  lastTimeReset : 0,
  intervalFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  intervalBulletFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  armyBuffer:[],

// GAME STATUS
gameStatus : {
  onMatch: false,
  alive: true,
  upgradeAvailable:0,
  upgradesComplete: false,
  lastWave : -1,
  surviveMode: false,
  endGame: false,
  statTaken:false,
},

//  waves complete statistic
wavesComplete: [
  // {kills:4, dead:1, precision: 80, totalEnemies:5, restartNumb:0 },
  // {kills:10, dead:0, precision: 87, totalEnemies:10, restartNumb:0 },
  // {kills:15, dead:5, precision: 75, totalEnemies:20, restartNumb:0 },
  // {kills:20, dead:5, precision: 71.5, totalEnemies:25, restartNumb:0 },
  // {kills:25, dead:5, precision: 68, totalEnemies:30, restartNumb:0 },
  // {kills:40, dead:10, precision: 74, totalEnemies:50, restartNumb:0 },
  // {kills:45, dead:5, precision: 65, totalEnemies:50, restartNumb:0 },
  // {kills:50, dead:10, precision: 62, totalEnemies:60, restartNumb:0 },
  // {kills:50, dead:15, precision: 59, totalEnemies:65, restartNumb:0 },
  // {kills:60, dead:5, precision: 68, totalEnemies:65, restartNumb:0 },
  // {kills:50, dead:20, precision: 48, totalEnemies:70, restartNumb:0 },
  // {kills:72, dead:8, precision: 62, totalEnemies:80, restartNumb:1 },
  // {kills:180, dead:180, precision: 32.7, totalEnemies:360, restartNumb:0 },
],

// waves complete sum
wavesCompletTot:
{kills:0, dead:0, precisionAverange: '0', totalEnemies:0, restartNumb:0 },
precisionAverange: 0,

//  score
killsPoint : 0,
survivorKillsPoint : 0,
deadPoint : 0,
precisionPoint : 0,
retrySum : 0,
finalScore: 0,

})

