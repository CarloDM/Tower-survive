<script>
import {store} from '../../data/store';
import LifeBar from '../single-components/lifeBar.vue'
export default {
name: 'Tower',
data() {
  return {
    store,
  };
},
methods: {},
components: {LifeBar,},
props:{}
}
</script>

<template>

  <div 
  class="tower visible " 
  :style="{ transform: `rotate(${store.tower.rotation}deg)`, 
              left: store.tower.cord.x + 'px',
              top: store.tower.cord.y + 'px',}"
  > 

    <img src="../../assets/texture/loader-opt.svg" style="transform: translateY(-14px);">
    <img src="../../assets/texture/cannon-opt.svg" style="transform: translateY(-14px);">

    <div class="cannon visible"></div>
<!-- 
    <div class="laser visible"></div>
    <div class="lasercenter visible"></div> -->

  </div>

</template>

<style lang="scss" scoped>
.tower{
  position: absolute;
  // background-image: url("/src/assets/texture/Cannon-Body-250px.png");
  background-size: cover;
  // background-color: rgba(13, 14, 12, 0.24);
  width: 180px;
  height: 180px;
  margin-top: -90px;
  margin-left: -90px;
  z-index: 2;

  & .cannon{
    position: absolute;
    // background-image: url("/src/assets/texture/Cannon-cane-70x300px.png");
    background-size: cover;
    // background-color: rgba(13, 14, 12, 0.24);
    transform: translate(-49%,-44%);
    top: 0%;
    left: 50%;
    width: 35px;
    height: 150px;
    z-index: 999;
  }
  & .laser{
    background-color: rgba(212, 91, 21, 0.438);
    box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.466);
    position: absolute;
    transform: translate(0%,-50%);
    top: 0%;
    left: 49.55%;
    width: 1px;
    height: 400px;
    z-index: 999;
  }
  & .lasercenter{
    background-color: rgb(0, 0, 0);
    box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.466);
    position: absolute;
    transform: translate(0%,-28%) rotate(135deg);
    top: 0%;
    left: 49.55%;
    width: 1px;
    height: 400px;
    z-index: 999;
  }
}
img{
  position: absolute;
  width: 100%;
}
</style>
