<script>
import {store} from '../../data/store'
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '../single-components/bullet.vue';
import Base from '../partials/base.vue';

export default {
  name:'BattleGrond',
  data(){
    return{
      store,
    }
  },
  components:{Enemy,Bullet,Tower,Base},
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
  computed:{},
  props:{},
  mounted(){
    let delay = setTimeout(() => {
      console.log('ciao stai per iniziare una versione di prova in sviluppo')  
    }, 100);

},
}
</script>

<template>
  <div id="battle" class="battle-ground">
    <!-- debug -->
    <!-- <button @click="finishLevel">finishLevel</button> -->

    <Enemy class=""
    v-for="(enemy, index) in store.army" :key="index"
    :id="index"
    :health="Math.trunc(enemy.health)"
    :alive="enemy.alive"
    :enemy="enemy"
    />

    <Bullet
    v-for="bullet, id in store.bullets" :key="id"
    class="bullet-container" 
    :id="bullet.id"
    :explode="bullet.explode"
    :bullett="bullet"
    />

    <Base/>
    <Tower />


  </div>

</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  z-index: 999;
  pointer-events: all;
}
</style>
