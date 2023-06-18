<script>
// import { ref } from 'vue';
import {store} from '../../data/store'
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '../single-components/bullet.vue';
// import {bulletShot} from '../../functions/gameLogic';
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
  <div id="battle" class="battle-ground">battle
    <Tower />

    <Enemy class=""

    v-for="enemy, index in store.army" :key="index"
    :id="index"
    :health="parseInt(enemy.health) "
    :alive="enemy.alive"
    
    />

    <Bullet
    v-if="(store.bullets.length > 0)"
    v-for="bullet, id in store.bullets" :key="id"
    class="bullet-container" 
    :id="bullet.id"
    
    />



  </div>

</template>

<style lang="scss" scoped></style>