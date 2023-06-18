<script>
import { GlobalEvents } from 'vue-global-events';
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';
import {bulletShot,animazioneMovimentoVerticale,aggiornaAngoloPuntamento, manualAim,closestSoldier,rand,} from '../functions/gameLogic';

import {update,calculateRotation} from '../functions/animated_Logic';
// import MyWorker from '../functions/workers/Worker?worker';

export default {
  name:'ControlSurface',
  data(){
    return{
      store,
      mouseStore,
      // proiettili: ref([])
      intervalId: null,
    }
  },
  components:{GlobalEvents,},
  methods:{

    tryWorker(){
        calculateRotation();
    },

    updateControl(){
      update();
    },
    
    manualAim(){
      manualAim();
    },
    
    updateTarget(event) {
      if(event.target.id === "battle"){
        mouseStore.mouse = [event.layerX,event.layerY];
        // console.log(mouseStore.mouse[0],  event.layerX, mouseStore.mouse[1],  event.layerY )
        console.log( event.layerX,  event.layerY )
      }
    },

    // handleKeyDown(event) { 
    //     // Tasto Space premuto
    //     if((event.keyCode === 32) && (!store.userShoting)){
    //       store.userShoting = true;
    //       this.intervalId = setInterval(() => {
    //         this.newshot();
    //       }, 500);
    //     // console.log('donw', event.keyCode);
    //   }
    // },  
    // handleKeyUp(event) {
    //   if(event.keyCode === 32){
    //     store.userShoting = false;
    //     clearInterval(this.intervalId);
    //     this.intervalId = null;
    //     // console.log('up', event.keyCode);
    //   }
    //     // Tasto Space rilasciato
    //   },

    animEnemy(){
      store.army.forEach(enemy => {
        animazioneMovimentoVerticale(enemy)
      });
    },
    enemyClean(){
      let clean = setInterval(() => {
        if(store.army.length > 0){
          store.army = store.army.filter(soldier => soldier.alive);
        }
      }, 2000);
      // this.autoShot();
      // this.autoAim();
      // this.autoAim();
      // this.autoShot();
    },
    enemypush(numb){
      for (let index = 0; index < numb; index++) {
        store.enemyCounter ++;
        const newEnemy =
              {cord : {x:150,y:0}, id:0,
              health: 1000, alive: true,};
              newEnemy.cord = {x:rand(50,550),y:rand(-160, -50)};
              newEnemy.id = store.enemyCounter;
  
              store.army.push(newEnemy);
              // animazioneMovimentoVerticale(store.army[store.army.length - 1])
              ;
      }
    },
    newshot(){
      store.shotCounter ++;
      const nshot =
      {
      id: 0,
      cord : {x:300,y:520},
      timeout: 20,
      radius: 30,
      velocity: 10,
      damage : 650,
      damageRadius: 100,
      explode: false,
      stop:false,
      autonomy: 440,
      rady: false,
      }
      nshot.id = store.shotCounter;
      store.bullets.push(nshot);
      bulletShot(
        store.bullets.find(item => item['id'] === nshot.id),
        store.tower.rotation,
        store.bullets.find(item => item['id'] === nshot.id).velocity
        )
    },
    autoShot(){
      store.autoShot = !store.autoShot;
      if(store.autoShot){
        const mitra = setInterval(() => {
          this.newshot();
          if(!store.autoShot){
            clearInterval(mitra);
          }
        }, 200);
      }else{}
    },

    stopTower(){
      console.log(store.tower.aim);
    },

    autoAim(){
      aggiornaAngoloPuntamento(closestSoldier(store.army));
    },


    deleteArmy(){
      store.army = [];
    store.bullets = [];
    },
  },
  props:{},
  mounted(){
    // this.enemyClean();
  }


}
</script>

<template>
        <!-- @keydown="handleKeyDown" 
      @keyup.space="handleKeyUp" -->
    <GlobalEvents
      @mousemove="updateTarget"
      />
  <div class="control-surface d-flex flex-wrap m-auto">



  <!-- <button @click="newshot()" class="btn">spara</button>
  <button @click="autoShot()" class="btn">mitra</button>
  <button @click="animEnemy()" class="btn">anim y</button>
  <button @click="enemypush(10)" class="btn">enemypush</button>
  <button @click="autoAim()" class="btn">auto aim</button>
  <button @click="manualAim()" class="btn">manual aim</button>
  <button @click="deleteArmy()" class="btn">clean array</button> -->
  <button @click="updateControl()" class="btn">update test</button>
  <button @click="tryWorker()" class="btn">wor</button>





  </div>
</template>

<style lang="scss" scoped>
.btn{
  width: 100px;
  height: 40px;
  background-color: rgb(192, 192, 192);
}
</style>