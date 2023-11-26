<script>
import {mouseStore} from '../data/mouseStore'
import BattleGrond from './partials/battleGround.vue';

export default {
  name:'Main',
  data(){
    return{
      mouseStore,
    }
  },
  components:{BattleGrond},
  methods:{
    updateMousePosition(event) {
        mouseStore.mouse = [event.layerX,event.layerY];
    },
  },
}
</script>

<template>
  <main  id="main" class="main">

    <BattleGrond @mousemove="updateMousePosition" />
    
  </main>
</template>
