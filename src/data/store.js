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
  enemyNumber: 1, // n nemici
  enemyFrequency: 50, // ogni n  framerequest

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
  bulletsFrequency: 15,
  bulletsVelocity: 15,
  bulletsDmgRadius: 50,
  bulletsDamage: 100,

// counter -----------
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

// waves
