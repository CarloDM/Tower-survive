<script>
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
import Bullet from '..//single-components/bullet.vue';
export default {
  name:'BattleGrond',
  components:{Tower,Enemy,Bullet},
  methods:{},
  props:{},
}
</script>

<template>
  <div class="battle-ground">battle
    <Tower />
    <Enemy />
    <Bullet />



  </div>

</template>

<style lang="scss" scoped></style>