<script>
export default {
  name:'LifeBar',
  props:{
    health: Number,
  },
  components:{},
  methods:{},
  computed: {
  },
}

</script>

<template>
  <div class="life-bar">

    <div class="health" :style="{ width: ((health / 500) * 100) + '%' }" ></div>

  </div>
</template>

<style lang="scss" scoped>

  .life-bar{
    position: absolute;
    transform: translate(0,0%);
    bottom: -10px;
    width: 60px;
    height: 8px;
    border: 1px solid black;
    & .health{
      background-color: rgb(9, 255, 0);
      height: 100%;

    }
  }


</style>