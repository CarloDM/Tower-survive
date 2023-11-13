import { Modal } from 'bootstrap';
import {reactive} from 'vue';
export const store = reactive ({

// creare i Modal/conteggio punteggio finale
//
// rinominare in inglese pulire logiche e funzioni
// produrre design
// produrre sound design e colonne sonore
// capire cache




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
  {enemies:5,   frequency:12,  enemyNumber:1,  minMaxSpeed:[0.9,1.5], minMaxhealt:[250,400]},    //1
  {enemies:5,   frequency:24,  enemyNumber:1,  minMaxSpeed:[0.9,1.8], minMaxhealt:[350,500]},    //2
  {enemies:12,  frequency:44,  enemyNumber:2,  minMaxSpeed:[1,1.8],   minMaxhealt:[400,600]},    //3 
  {enemies:16,  frequency:42,  enemyNumber:2,  minMaxSpeed:[1,2],     minMaxhealt:[400,650]},    //4 
  {enemies:24,  frequency:80,  enemyNumber:3,  minMaxSpeed:[1.4,2.0], minMaxhealt:[400,680]},    //5 

  {enemies:30,  frequency:78,  enemyNumber:3,  minMaxSpeed:[1.0,2.2], minMaxhealt:[500,680]},    //6 
  {enemies:60,  frequency:24,  enemyNumber:1,  minMaxSpeed:[0.5,2.6], minMaxhealt:[500,750]},    //7

  {enemies:70,  frequency:48,  enemyNumber:2,  minMaxSpeed:[0.8,2.6], minMaxhealt:[500,800]},    //8
  {enemies:70,  frequency:42,  enemyNumber:2,  minMaxSpeed:[0.6,2.8], minMaxhealt:[580,940]},    //9 
  {enemies:72,  frequency:60,  enemyNumber:3,  minMaxSpeed:[1,3.2],   minMaxhealt:[850,1000]},   //10  
  {enemies:70,  frequency:20,  enemyNumber:1,  minMaxSpeed:[1,3.5],   minMaxhealt:[900,1200]},   //11 
  {enemies:90,  frequency:12,  enemyNumber:1,  minMaxSpeed:[1,3.5],   minMaxhealt:[1000,1500]},  //12
  {enemies:110, frequency:12,  enemyNumber:1,  minMaxSpeed:[1,4],     minMaxhealt:[1200,2000]},  //13

  {enemies:140, frequency:200, enemyNumber:7, minMaxSpeed:[0.6,1.3], minMaxhealt:[7000,9000]}, //14
  {enemies:180, frequency:24,  enemyNumber:1,  minMaxSpeed:[8,12],    minMaxhealt:[900,1500]},   //15
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
  rateOfFire : 13,
  bulletsVelocity: 8,
  explosionRadius: 40,
  damage:360,
  fortune:10,
},
  userHealth: 1000,
  activationRadius: 30,
// SPECIAL EVENT

boosting:false,

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
  wavesCount: - 1,
  enemyCounter: 0,
  shotCounter:0,
  autoShot: false,
  autoAim: false,
  manualAim: false,
  kills: 0,
  dead: 0,

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

