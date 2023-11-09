<script>
import {store} from '../../data/store'
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '../single-components/bullet.vue';

export default {
  name:'BattleGrond',
  data(){
    return{
      store,
    }
  },
  components:{Tower,Enemy,Bullet},
  methods:{},
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
  <div id="battle" class="battle-ground">battle

    <Enemy class=""
    v-for="(enemy, index) in store.army" :key="index"
    :id="index"
    :health="Math.trunc(enemy.health)"
    :alive="enemy.alive"
    />

    <Bullet
    v-for="bullet, id in store.bullets" :key="id"
    class="bullet-container" 
    :id="bullet.id"
    :explode="bullet.explode"
    :bullett="bullet"
    />

    <Tower />

  </div>

</template>
