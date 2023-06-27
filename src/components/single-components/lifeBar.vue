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
    transform: translate(-20%, 0%);
    bottom: -5px;
    width: 50px;
    height: 4px;
    border: 1px solid black;
    opacity: 0.5;
    & .health{
      background-color: rgb(9, 255, 0);
      height: 100%;

    }
  }


</style>