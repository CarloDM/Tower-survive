<script>
import { GlobalEvents } from 'vue-global-events';
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';
import {sayWhichwave} from '../functions/audio';
import {update,calculateRotation} from '../functions/animated_Logic';

export default {
  name:'ControlSurface',
  data(){
    return{
      store,
      mouseStore,
    }
  },

  components:{GlobalEvents,},
  
  methods:{
    
    startBattle(){
      store.wavesCount ++;
      sayWhichwave(store.wavesCount + 1);
      store.kills = 0;
      store.dead = 0;
      store.enemyCounter = 0;
      store.army= [];
      store.bullets = [];
      store.animation = true;
      setTimeout(() => {
        update();
      }, 1000);
    },
    stopBattle(){
      store.animation = false;
    },
    activeMouseAim(){
        calculateRotation();
    },
    updateMousePosition(event) {
      mouseStore.mouse = [event.layerX,event.layerY];
    },
    upGradeUser(key){
      switch (key) {
        case 'rateOfFire':
          console.log('rateOfFire max 13')
          store.user.rateOfFire += 1;
          break;
        case 'bulletsVelocity':
          console.log('bulletsVelocity max 8')
          store.user.bulletsVelocity += 2;
          break;
        case 'explosionRadius':
          console.log('explosionRadius max 40')
          store.user.explosionRadius += 10;
          store.activationRadius += 2;
          break;
        case 'damage':
          console.log('damage max 360')
          store.user.damage += 40;
          break;
        case 'fortune':
          console.log('fortune max 10')
          store.user.fortune += 1;
          break;

      }
    }
  },

  mounted(){}

}
</script>

<template>
<GlobalEvents
  @mousemove="updateMousePosition"
/>


  <div class="control-surface d-flex flex-wrap m-auto">

      <button @click="startBattle()" class="">startBattle</button>
      <button @click="stopBattle()" class="">stop test</button>
      <button @click="activeMouseAim()" class="">active mouse aim</button>

      <div v-if="!store.animation" 
      class="control-surface ">

          <button v-for="(butt,key) in store.user" :key="key" 
          @click="upGradeUser(key)"
          class="my_btn"
          >
          {{ butt }} {{ key }}
          </button>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.my_btn{
  padding: 5px;
  background-color: rgba(221, 255, 199, 0.795);
}
</style>