<script>
import {mouseStore} from '../data/mouseStore'
import { GlobalEvents } from 'vue-global-events';
import BattleGrond from './partials/battleGround.vue';

export default {
  name:'Main',
  data(){
    return{
      mouseStore,
    }
  },
  components:{GlobalEvents,BattleGrond},
  methods:{
    updateMousePosition(event) {
      mouseStore.mouse = [event.layerX,event.layerY];
    },
  },
}
</script>

<template>
  <main  id="main" class="main d-flex justify-content-center align-item-center  ">

    <GlobalEvents
    @mousemove="updateMousePosition"/>
    <BattleGrond />
    

  </main>
</template>

<style lang="scss" scoped></style>