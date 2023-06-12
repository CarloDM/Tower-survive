<script>
// import { ref } from 'vue';
import {store} from '../../data/store'
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '..//single-components/bullet.vue';
import {bulletShot} from '../../functions/gameLogic';
export default {
  name:'BattleGrond',
  data(){
    return{
      store,
      // proiettili: ref([])
    }
  },
  components:{Tower,Enemy,Bullet},
  methods:{

  },
  props:{},
  mounted(){
    let delay = setTimeout(() => {
      // bulletShot(store.bullet, store.tower.rotation, store.bullet.velocity) ; 
      console.log('ciao stai per iniziare una versione di prova in sviluppo')  
    }, 100);

},
}
</script>

<template>
  <div class="battle-ground">battle
    <Tower />

    <Enemy class=""

    v-for="enemy, index in store.army" :key="index"
    :id="index"
    :health="parseInt(enemy.health) "
    :alive="enemy.alive"
    />

    <Bullet v-for="bullet, id in store.bullets" :key="id"
    class="bullet-container" 
    :style="{
    left: bullet.cord.x + 'px',
    top: bullet.cord.y + 'px', 
    }"
    :explosionRadius="bullet.damageRadius"
    :triggerArea="bullet.radius"
    :explode="bullet.explode"
    :rady="bullet.rady"
    />



  </div>

</template>

<style lang="scss" scoped></style>