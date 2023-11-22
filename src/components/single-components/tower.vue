<script>
import {store} from '../../data/store';
export default {
name: 'Tower',
  data() {
    return {
      store,
      recoil: false,
    };
  },
  watch:{
    'store.shotCounter'(n,o){
      if(n !== o){
        this.recoil = !this.recoil;
      }
    }
  }
}
</script>

<template>

  <div 
  class="tower"
  :style="{ 
    transform: `rotate(${store.tower.rotation}deg)`, 
    left: store.tower.cord.x + 'px',
    top: store.tower.cord.y + 'px',
    }"
    > 

    <img src="../../assets/texture/loader-opt.svg" style="transform: translateY(-14px);">
    <img src="../../assets/texture/cannon-opt.svg" style="transform: translateY(-14px);"
    :class="{'recoil' : this.recoil, 'recoil2' : !this.recoil,}"
    >


    <!--  debug
    <div class="laser visible"></div>
    <div class="lasercenter visible"></div> 
    -->
  </div>
</template>

<style lang="scss" scoped>

// debug
// .laser{
//     background-color: rgba(212, 91, 21, 0.438);
//     box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.466);
//     position: absolute;
//     transform: translate(0%,-50%);
//     top: 0%;
//     left: 49.55%;
//     width: 1px;
//     height: 400px;
//     z-index: 999;
//   }
// .lasercenter{
//     background-color: rgb(0, 0, 0);
//     box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.466);
//     position: absolute;
//     transform: translate(0%,-28%) rotate(135deg);
//     top: 0%;
//     left: 49.55%;
//     width: 1px;
//     height: 400px;
//     z-index: 999;
//   }

</style>
