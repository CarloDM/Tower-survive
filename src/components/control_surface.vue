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
  },

  mounted(){}

}
</script>

<template>

    <GlobalEvents
      @mousemove="updateMousePosition"
      />
  <div class="control-surface d-flex flex-wrap m-auto">

  <button @click="startBattle()" class="">update test</button>
  <button @click="stopBattle()" class="">stop test</button>
  <button @click="activeMouseAim()" class="">active mouse aim</button>

  </div>
</template>

<style lang="scss" scoped>
.btn{
  width: 100px;
  height: 40px;
  background-color: rgb(192, 192, 192);
}
</style>