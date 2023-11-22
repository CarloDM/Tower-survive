<script>
import {rand} from '../../functions/animated_Logic';
export default {
  name:'Bullet',
  props:{
    bullett: Object,
  },
  methods:{
    randomPitTexture(){
      let i = rand(1,4);
      switch (i) {
        case 1:
          return 'pit-texture1';
          break;
        case 2:
          return 'pit-texture2';
          break;
        case 3:
          return 'pit-texture4';
          break;
      }
    }
  }
}
</script>

<template>

  <div 
  class="bullet debug" 
  :class="{'pit' : this.bullett.rady, 'critical' : this.bullett.critical, [randomPitTexture()]: true}"  
  :style="{left: `${this.bullett.cord.x}px`,top: `${this.bullett.cord.y}px`}"
  >
</div>
<div v-if="this.bullett.explode"
  class="explosion"
  :class="{'critical' : this.bullett.critical}"  
  :style="{width: `${this.bullett.damageRadius * 1.7}px`,left: `${this.bullett.cord.x}px`,top: `${this.bullett.cord.y}px`}"
  >

      <!-- debug -->
      <!-- <div v-if="!this.bullett.explode"
      class="trigger-area"  
      :style="{width: `${this.bullett.radius * 1}px` }">
      </div> -->
  </div>

</template>
