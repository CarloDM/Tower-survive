<script>
import {store} from '../../data/store';
import LifeBar from '../single-components/lifeBar.vue';
export default {
name: 'Enemy',
data() {
  return {
    store,
  };
},
props:{
  id: Number,
  health: Number,
  alive: Boolean,
},
components: {LifeBar},
}
</script>

<template>
  <div class="enemy" :class="!(alive) ? 'dead' : '' " :style="{  left: store.army[id].cord.x + 'px' , top: store.army[id].cord.y + 'px',} ">

    <p>{{ health }}</p>

    <LifeBar 
    :health="health" />
  </div> 

</template>


<style lang="scss" scoped>
.enemy{
  position: absolute;
  z-index: 999;
  background-color: rgb(61, 70, 80);
  width: 30px;
  aspect-ratio: 1/1;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  font-size: 0.7rem;

  &.dead{
    opacity: 0.7;
    background-color: rgb(180, 47, 47);
    border: 2px solid white;
    opacity: 0.25;
    z-index: 0;
  }
}
</style>
