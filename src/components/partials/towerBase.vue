<script>
import {store} from '../../data/store'
export default {
  name: 'TowerBase',
  data(){
    return{
      store,
      boostingTimeOut : 0,
      canBoost : false,
    }
  },
  watch:{
    'store.boostingTimeOut'(n,o){
      if(n !== o){
        this.boostingTimeOut = n;
      }
    },

    'store.userHealth'(ne,ol){
      if(ne !== ol && ne < 7500){
        this.canBoost = true;
      }else{
        this.canBoost = false;
      }
    },
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
      <div :class="{'can-boost': this.canBoost}"></div>
      <div :class="{
        'boosting4': this.boostingTimeOut == 4000,
        'boosting5': this.boostingTimeOut == 5000,
        'boosting8': this.boostingTimeOut == 8000,
        }"></div>
    </div>
    <div class="boostDisplay " ><span>{{ store.boostNameDisplay }}</span></div>

    <div class="userHealth">
      <div class="healthmask" :style="{width: 100 - ((store.userHealth / 10000) * 100)  + '%' }" ></div>
    </div>

    <img src="../../assets/texture/base-opt.svg" alt="">

    <span v-if="store.record" class="best_record">Best Score: {{store.record}} </span>
    
  </div>
</template>
