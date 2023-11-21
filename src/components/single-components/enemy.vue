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
  enemy: Object,
},
components: {LifeBar},
}
</script>

<template>
  <div class="enemy" :class="!(enemy.alive) ? 'dead' : '' " :style="{  left: enemy.cord.x + 'px' , top: enemy.cord.y + 'px',} ">

    <p v-if="enemy.alive">
      {{ Math.trunc(enemy.health) }}
    </p>

    <LifeBar 
    v-if="enemy.alive"
    :health="enemy.health" />
    </div> 

</template>


<style lang="scss" scoped>
.enemy{
  position: absolute;
  text-align: center;
  z-index: 19;
  background-color: rgb(88, 100, 114);
  box-shadow: 0px -5px 5px 0px rgba(46, 46, 46, 0.397);
  width: 30px;
  aspect-ratio: 1/1;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  font-size: 0.7rem;
  transition: opacity 20s;
  & p {
    padding-top: 7px;
    color: rgb(221, 221, 221);
    font-size: 0.6rem;
    font-weight: 900;
    letter-spacing: 1px;
    margin: auto;
  }
  &.dead{
    background-color: rgba(59, 10, 10, 0.856);
    box-shadow: 0px 0px 2px 2px   rgb(59, 10, 10);
    opacity: 0;
    z-index: 1;
  }
}

</style>
