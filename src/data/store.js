import {reactive} from 'vue';
export const store = reactive ({

  tower : {
          cord : {x:300,y:860},
          rotation : 0,
          aim: false,
          },

// enemy
// army: [ {cord : {x:150,y:20}, id:0,health: 1000, alive: true}, ecc...  ]
  army : [],
  enemyNumber: function(waveNumber){return this.waves[waveNumber].enemyNumber;}, // n nemici
  enemyFrequency: function(waveNumber){return this.waves[waveNumber].frequency;}, // ogni n  framerequest
// waves
waves:[
  {enemies:5, frequency:12, enemyNumber:1, minMaxSpeed:[0.9,1.5],minMaxhealt:[250,400]}, //1
  {enemies:5, frequency:24, enemyNumber:1, minMaxSpeed:[0.9,1.8],minMaxhealt:[350,500]}, //2
  // {enemies:8, frequency:24, enemyNumber:1, minMaxSpeed:[1,2.5],  minMaxhealt:[400,500]}, //3
  {enemies:12, frequency:44, enemyNumber:2, minMaxSpeed:[1,1.8],  minMaxhealt:[400,600]}, //4 
  {enemies:15, frequency:42, enemyNumber:2, minMaxSpeed:[1,2],    minMaxhealt:[400,650]}, //5 meno nemici
  // {enemies:20, frequency:82, enemyNumber:3, minMaxSpeed:[1,3],    minMaxhealt:[400,660]}, //6 meno nemici
  {enemies:25, frequency:80, enemyNumber:3, minMaxSpeed:[1.4,2.0],minMaxhealt:[400,680]}, //7 meno nemici
  {enemies:30, frequency:78, enemyNumber:3, minMaxSpeed:[1.0,2.2],minMaxhealt:[500,680]}, //8 
  // {enemies:35, frequency:76, enemyNumber:3, minMaxSpeed:[1.2,2.4],minMaxhealt:[500,680]}, //9
  {enemies:60, frequency:24, enemyNumber:1, minMaxSpeed:[0.8,2.6],minMaxhealt:[500,700]}, //10

  {enemies:70, frequency:48, enemyNumber:2, minMaxSpeed:[0.8,2.6],minMaxhealt:[500,700]}, //11
  // {enemies:70, frequency:44, enemyNumber:2, minMaxSpeed:[1,2.6],  minMaxhealt:[500,800]}, //12 
  {enemies:70, frequency:42, enemyNumber:2, minMaxSpeed:[0.6,2.8],minMaxhealt:[580,840]}, //13 

  // {enemies:70, frequency:78, enemyNumber:3, minMaxSpeed:[0.8,3],  minMaxhealt:[650,940]}, //14 
  // {enemies:70, frequency:74, enemyNumber:3, minMaxSpeed:[1,3],    minMaxhealt:[750,1100]}, //15 
  {enemies:70, frequency:70, enemyNumber:3, minMaxSpeed:[1,3.2],  minMaxhealt:[850,1250]}, //16 more 

  {enemies:70, frequency:20, enemyNumber:1, minMaxSpeed:[1,3],    minMaxhealt:[900,1250]}, //17 more
  // {enemies:85, frequency:16, enemyNumber:1, minMaxSpeed:[1,3],    minMaxhealt:[1000,1240]}, //18
  {enemies:90, frequency:12, enemyNumber:1, minMaxSpeed:[1,3.5],    minMaxhealt:[1000,1500]}, //19
  {enemies:110,frequency:10, enemyNumber:1, minMaxSpeed:[1,4],   minMaxhealt:[1200,2000]}, //20

  {enemies:100,frequency:300, enemyNumber:20, minMaxSpeed:[1.2,1.5],   minMaxhealt:[8000,11000]}, //21
  {enemies:180,frequency:24, enemyNumber:1, minMaxSpeed:[8,16],   minMaxhealt:[900,1400]}, //22
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
  health:10000,
},
  activationRadius: 30,
  
// counter -----------
  wavesCount: - 1,
  enemyCounter: 0,
  shotCounter:0,
  autoShot: false,
  autoAim: false,
  manualAim: false,
  kills: 0,
  dead:0,

 // utiliti
  checkDivider : true,
  userShoting : false,

// animation frame
  frameCount: 0,
  animation: false,
  lastTime : 0,
  lastTimeBullet : 0,
  lastTimeReset : 0,
  intervalFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  intervalBulletFrame : (1000 / 60), // Intervallo di tempo  (in millisecondi)
  armyBuffer:[],
})

