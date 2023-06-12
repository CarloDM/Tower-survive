import {reactive} from 'vue';
export const store = reactive ({

  tower : {
          cord : {x:300,y:520},
          rotation : 0,
          aim: false,
          attak: 1},
  
  enemyCounter: 0,
  army : [
    // {cord : {x:150,y:20}, id:0,
    // health: 1000, alive: true,}
  ],

  shotCounter:1,
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
  kills: 0,
  money: 0,
  dead:0,

})