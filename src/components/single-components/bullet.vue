<script>
export default {
  name:'Bullet',
  props:{
    bullett: Object,
  },
}
</script>

<template>

  <div 
  class="bullet debug" 
  :class="{'pit' : this.bullett.rady, 'critical' : this.bullett.critical,}"  
  :style="{left: `${this.bullett.cord.x}px`,top: `${this.bullett.cord.y}px`}"
  >

      <div v-if="this.bullett.explode"
        class="explosion"
        :class="{'critical' : this.bullett.critical}"  
        :style="{width: `${this.bullett.damageRadius * 1.7}px`}"
        >
      </div>

      <!-- debug -->
      <!-- <div v-if="!this.bullett.explode"
      class="trigger-area"  
      :style="{width: `${this.bullett.radius * 1}px` }">
      </div> -->
  </div>

</template>
