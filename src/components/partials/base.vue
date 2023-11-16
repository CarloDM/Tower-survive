<script>
import {store} from '../../data/store'
export default {
  name: 'Base',
  data(){
    return{
      store,
    }
  }
  
}
</script>

<template>
  <div class="base ">

    <div class="towerLight"></div>

    <div class="towerParams">
      <div class="param "><h6>DMG</h6><span>{{store.user.damage}}         </span></div>
      <div class="param "><h6>RDS</h6><span>{{store.user.explosionRadius}}</span></div>
      <div class="param "><h6>ROF</h6><span>{{store.user.rateOfFire}}     </span></div>
      <div class="param "><h6>VEL</h6><span>{{store.user.bulletsVelocity}}</span></div>
      <div class="param "><h6>FRT</h6><span>{{store.user.fortune}}        </span></div>
    </div>

    <div class="boost">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="userHealth">
      <div class="healthmask" :style="{width: 100 - ((store.userHealth / 10000) * 100)  + '%' }" ></div>
    </div>

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
  box-shadow: 0px 0px 20px 5px black;
  & img{
    filter: brightness(70%);
  }
}

.towerLight{
  position: absolute;
  top: 10px;
  left: 230px;
  width: 140px;
  height: 75px;
  background-color: rgb(29, 202, 224);
  z-index: -1;
}
.towerParams{
  position: absolute;
  top: 22px;
  left: 50px;
  width: 137px;
  height: 65px;
  background-color: rgb(31, 40, 116);
  z-index: -1;
  display: flex;
}
.param{
  width: calc(100% / 5);
  height: 100%;
  border: 1px dashed green;
  text-align: center;
  & h6{
    font-size: 0.6rem;
    margin-top: 9px;
    margin-bottom: 10px;
    font-weight: 500;
    color: white;
  }
  & span{
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
  }
}
.boost{
  position: absolute;
  background-color: rgb(31, 40, 116);
  right: 50.5px;
  top: 10px;
  width: 47px;
  height: 76px;
  z-index: -1;
  display: flex;
  justify-content: center;
  &  div {
    width: calc(100% / 3);
    height: 100%;
    box-shadow: inset 0px 0px 9px 0px black;
    background-color: red;
  }
}
.userHealth{
  position: absolute;
  background-color: rgb(0, 202, 61);
  right: 49px;
  bottom: 23px;
  width: 505px;
  height: 18px;
  z-index: -1;
  display: flex;
  & .healthmask{
    margin-left: auto;
    background-color: rgb(43, 43, 43);
    transition: all 0.5s ease-out;
  }
}

</style>