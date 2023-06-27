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
components : {LifeBar,},
props:{}
}
</script>

<template>
  <div 
  class="tower visible" 
  :style="{ transform: `rotate(${store.tower.rotation}deg)`,
              left: store.tower.cord.x + 'px',
              top: store.tower.cord.y + 'px', 
            }"
    > 
    <div class="cannon visible">
    </div>
    <div class="laser visible">
    </div>

    <!-- <LifeBar  /> -->
    
    
  </div>
</template>


<style lang="scss" scoped>
.tower{
  position: absolute;
  background-color: rgba(13, 14, 12, 0.24);
  width: 60px;
  height: 60px;
  margin-top: -25px;
  margin-left: -25px;

  & .cannon{
    background-color: rgba(41, 53, 34, 0.308);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 0%;
    left: 50%;
    width: 15px;
    height: 75px;
    z-index: 999;
  }
  & .laser{
    background-color: rgba(212, 91, 21, 0.438);
    box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.466);
    position: absolute;
    transform: translate(-50%,-120%);
    top: 0%;
    left: 50%;
    width: 1px;
    height: 400px;
    z-index: 999;
  }
}
</style>
