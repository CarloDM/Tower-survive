<script>
export default {
  name:'Bullet',
  components:{},
  methods:{},
  props:{
    explosionRadius: Number,
    triggerArea: Number,
    explode: Boolean,
    rady: Boolean,
  },
}
</script>

<template>
  <div class="bullet" :class="rady ? 'rady' : ''">
    <div class="explosion" :class="explode ? 'active' : ''"  :style="{ width: explosionRadius * 1.5 + 'px' }"></div>
    <div class="trigger-area"  :style="{ width: triggerArea * 1.5 + 'px' }"></div>


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

  &.rady{
    background-color: rgb(236, 117, 70);
  }

  & .explosion {
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    // background-color: rgba(255, 255, 255, 0.096);
      background: radial-gradient(circle,
    rgba(255, 196, 0, 0),
    rgba(232, 235, 191, 0.918),
    rgba(243, 109, 68, 0),
    rgba(0, 0, 0, 0),
    rgba(36, 33, 33, 0));
    opacity: 0;
    transition: all 0.5s ease-out ;
  }
  & .explosion.active{
    // background-color: rgba(255, 255, 255, 0.096);
      background: radial-gradient(circle,
    rgba(255, 196, 0, 0.13),
    rgba(255, 238, 0, 0.007),
    rgba(243, 109, 68, 0.158),
    rgba(0, 0, 0, 0.219),
    rgba(36, 33, 33, 0.658));
    opacity: 1;
  }

  & .trigger-area{
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    border: 2px dashed rgba(160, 221, 110, 0.247);
  }
}
</style>