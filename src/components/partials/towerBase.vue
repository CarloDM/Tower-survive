<script>
import {store} from '../../data/store'
export default {
  name: 'TowerBase',
  data(){
    return{
      store,
    }
  }
}
</script>

<template>
  <div class="tower-base ">

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
