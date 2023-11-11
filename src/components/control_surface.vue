<script>
import { GlobalEvents } from 'vue-global-events';
import {store} from '../data/store';
import {mouseStore} from '../data/mouseStore';

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
      store.kills = 0;
      store.dead = 0;
      store.enemyCounter = 0;
      store.army= [];
      store.bullets = [];
      store.animation = true;
      update();
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

  <div v-if="!store.animation" >
    <button v-for="(butt,key) in store.user" :key="key" 
    @click="upGradeUser(key)"
    >
    {{ butt }} {{ key }}
    </button>
    
  </div>

  </div>
</template>

<style lang="scss" scoped>
.btn{
  width: 100px;
  height: 40px;
  background-color: rgb(192, 192, 192);
}
</style>