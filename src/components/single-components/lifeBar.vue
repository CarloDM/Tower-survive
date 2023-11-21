<script>
export default {
  name:'LifeBar',
  data(){
    return{
      initialHealth: 0,
    }
  },
  props:{
    health: Number,
  },
  mounted(){
    this.initialHealth = this.health;
  }
}
</script>

<template>
  <div class="life-bar">

    <div class="health" 
    :style="{ width: ((health / this.initialHealth) * 100) + '%' }" >
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .life-bar{
    position: absolute;
    transform: translate(-20%, 0%);
    bottom: -5px;
    width: 50px;
    height: 4px;
    border: 1px solid black;
    opacity: 0.5;
    overflow: hidden;
    & .health{
      background-color: rgb(9, 255, 0);
      height: 100%;
    }
  }


</style>