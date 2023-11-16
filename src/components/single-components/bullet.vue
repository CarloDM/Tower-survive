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
  class="bullet debug" 
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
      
      <!-- <div v-if="!this.bullett.explode"
      class="trigger-area"  
      :style="{width: `${this.bullett.radius * 1}px` }">
      </div> -->

  </div>


</template>

<style lang="scss" scoped>
.bullet{
  position: absolute;
  width: 8px;
  aspect-ratio: 1/1;
  transform: translate(-50%,-50%);
  background-color: black;
  // border: 1px solid white;
  border-bottom: 1px solid 
  rgba(174, 192, 173, 0.712);
  border-radius: 50%;

  &.critical{
    background-color: rgb(198, 198, 220) ;
    box-shadow: 0px 0px 10px 7px  rgba(198, 198, 220, 0.411);
  }
  &.rady{
    background-color: rgba(112, 77, 63, 0.548);
    box-shadow:  0px 0px 8px 6px rgb(180, 147, 132);
    width: 15px;
    animation-name: dissolveCrater ;
    animation-duration: 5s ;
    animation-timing-function: ease-in;
    opacity: 0;
  }
}
@keyframes dissolveCrater {
  from { opacity:1 }
  to {opacity:0 }
}
.trigger-area{
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-35%,-35%);
    border-radius: 50%;
    border: 2px dashed rgba(160, 221, 110, 0.774);
  }
.explosion {
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%)  scale(0%);
    border-radius: 50%;
    background-color: rgb(168, 118, 42);
    opacity: 0;
    animation-name: dissolve ;
    animation-duration: 0.5s ;
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
  20%{
    background-color: rgba(253, 1, 1, 0);
    transform:translate(-50%,-50%) scale(40%)
  }
  90% {
    transform:translate(-50%,-50%) scale(100%);
    opacity: 0.3;}
}
</style>