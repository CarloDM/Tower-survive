<script>
import {store} from '../../data/store';
import LifeBar from '../single-components/lifeBar.vue';
export default {
name: 'Enemy',
data() {
  return {
    store,
    speed: '',
    armor: ''
  };
},
props:{
  enemy: Object,
},
components: {LifeBar},
mounted(){

    if(this.enemy.speed >= 0 && this.enemy.speed <= 0.9){
      this.speed = 'varyslow';
    }else if (this.enemy.speed >= 0.91 && this.enemy.speed <= 1.7){
      this.speed = 'slow';
    }else if (this.enemy.speed >= 1.71 && this.enemy.speed <= 2.8){
      this.speed = 'medium';
    }else if (this.enemy.speed >= 2.81 && this.enemy.speed <= 4){
      this.speed = 'fast';
    }else if (this.enemy.speed >= 4.1 && this.enemy.speed <= 9){
      this.speed = 'veryfast';
    }else if(this.enemy.speed >= 9.1 && this.enemy.speed <= 14){
      this.speed = 'ultrafast';
    }

    if(this.enemy.health >= 0 && this.enemy.health <= 400){
      this.armor = 'low';
    }else if(this.enemy.health >= 401 && this.enemy.health <= 1199){
      this.armor = 'mid';
    }else if(this.enemy.health >= 1200 && this.enemy.health <= 3000){
      this.armor = 'high';
    }else if(this.enemy.health >= 3000 && this.enemy.health <= 10000){
      this.armor = 'big';
    }
    }
  }
</script>

<template>
<!-- :class="{!(enemy.alive) ? 'dead' : '' }"  -->
  <div class="enemy" 
  :class="{
    'vary-slow' : this.speed ===  'varyslow',
    'slow' :      this.speed ===      'slow',
    'medium' :    this.speed ===    'medium',
    'fast' :      this.speed ===      'fast',
    'very-fast' : this.speed ===  'veryfast',
    'ultra-fast': this.speed === 'ultrafast',

    'low-armor' : this.armor  ===  'low',
    'mid-armor' : this.armor  ===  'mid',
    'high-armor': this.armor  === 'high',
    'big-armor' : this.armor  ===  'big',

    'dead' : !enemy.alive,
  }"
  :style="{  left: enemy.cord.x + 'px' , top: enemy.cord.y + 'px',} ">

    <p v-if="enemy.alive">
      {{ Math.trunc(enemy.health) }}
    </p>

    <LifeBar 
    v-if="enemy.alive"
    :health="enemy.health" />
    </div> 

</template>