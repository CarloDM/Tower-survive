<script>
import Tower from '../single-components/tower.vue';
import Enemy from '../single-components/enemy.vue';
export default {
  name:'BattleGrond',
  components:{Tower,Enemy},
  methods:{},
  props:{},
}
</script>

<template>
  <div class="battle-ground">battle
    <Tower />
    <Enemy />


  </div>

</template>

<style lang="scss" scoped></style>