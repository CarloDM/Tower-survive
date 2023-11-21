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
  enemy: Object,
},
components: {LifeBar},
}
</script>

<template>

  <div class="enemy" 
  :class="!(enemy.alive) ? 'dead' : '' " 
  :style="{  left: enemy.cord.x + 'px' , top: enemy.cord.y + 'px',} ">

    <p v-if="enemy.alive">
      {{ Math.trunc(enemy.health) }}
    </p>

    <LifeBar 
    v-if="enemy.alive"
    :health="enemy.health" />
    </div> 

</template>