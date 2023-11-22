<script>
import {store} from '../../data/store'
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '../single-components/bullet.vue';
import TowerBase from './towerBase.vue';

export default {
  name:'BattleGrond',
  data(){
    return{
      store,
    }
  },
  components:{Enemy,Bullet,Tower,TowerBase},
  methods:{
    // debug
    finishLevel(){
      store.autoShot = false;
      store.gameStatus.lastWave = store.wavesCount;
      store.animation = false;
      store.gameStatus.onMatch = false;
      store.army = [];
      store.bullets = [];
      if(store.wavesCount < 13){
        store.gameStatus.upgradeAvailable = 3;
      }
    }
  },
}
</script>

<template>
  <div id="battle" class="battle-ground">

    <!-- debug -->
    <button @click="finishLevel">finishLevel</button>
    <!-- debug -->

    <Enemy 
    v-for="(enemy, index) in store.army" :key="index"
    :enemy="enemy"
    />

    <Bullet
    v-for="bullet, id in store.bullets" :key="id" 
    :bullett="bullet"
    />

    <TowerBase/>
    <Tower />


  </div>

</template>
<style lang="scss" scoped>
// dubug
button { 
  cursor: pointer;
  z-index: 999;
  pointer-events: all;
}
// dubug
</style>
