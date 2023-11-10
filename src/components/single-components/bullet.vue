<script>

export default {
  name:'Bullet',
  components:{},
  data(){
    return{
    }
  },
  props:{
    bullett: Object,
  },
}
</script>

<template>

  <div 
  class="bullet" 
  :class="{
    'rady' : this.bullett.rady,
    'critical' : this.bullett.critical,
    }"  
  :style="{left: `${this.bullett.cord.x}px`,top: `${this.bullett.cord.y}px`}"
  >

      <div v-if="this.bullett.explode"
        class="explosion"
        :class="{
        'critical' : this.bullett.critical,
        }"  
        :style="{width: `${this.bullett.damageRadius * 1.7}px`}"
        >
      </div>
      
      <div v-if="!this.bullett.explode"
      class="trigger-area"  
      :style="{width: `${this.bullett.radius * 1}px` }">
      </div>
  </div>


</template>

<style lang="scss" scoped>
.bullet{
  position: absolute;
  width: 5px;
  aspect-ratio: 1/1;
  transform: translate(-50%,-50%);
  background-color: black;
  border-radius: 50%;
  &.critical{
    background-color: rgb(198, 198, 220) ;
  }
  &.rady{
    background-color: rgb(236, 117, 70);
  }
}
.trigger-area{
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    border: 2px dashed rgba(160, 221, 110, 0.774);
  }
.explosion {
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%)  scale(0%);
    border-radius: 50%;
    background-color: rgba(219, 151, 48, 1);
    opacity: 0;
    animation-name: dissolve ;
    animation-duration: 1s ;
    animation-timing-function: ease-in-out;
    &.critical{
      background-color: rgb(219, 68, 48);     
      opacity: 1;
    }
}

@keyframes dissolve {
  from {
    transform:translate(-50%,-50%) scale(100%);
    background-color: rgb(175, 212, 201);
    opacity: 0.7;}
  10%{
    background-color: rgba(253, 1, 1, 0);
    transform:translate(-50%,-50%) scale(5%)
  }
  90% {
    transform:translate(-50%,-50%) scale(100%);
    opacity: 0.4;}
}
</style>