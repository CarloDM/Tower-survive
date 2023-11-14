
<script>
export default {
  name: 'Base',
  data(){
    return{

    }
  }
  
}
</script>

<template>
  <div class="base debug">

    <div class="towerLight"></div>
    <img src="../../assets/texture/base-opt.svg" alt="">
    

  </div>
</template>

<style lang="scss" scoped>
.base{
  position: absolute;
  bottom: -70px;
  width: 600px;
  height: 140px;
  z-index: 1;
  background-color: black;
}
img{
  display: inline-block;
  // opacity: 0.2;

}

.towerLight{
  position: absolute;
  top: 10px;
  left: 230px;
  width: 140px;
  height: 75px;
  background-color: rgb(201, 211, 57);
  z-index: -1;
}

</style>