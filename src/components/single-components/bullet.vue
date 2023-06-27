<script>
import {store} from '../../data/store';
export default {
  name:'Bullet',
  components:{},
  data(){
    return{
      triggerArea :{ width:  `${20 * 1.5}px`},
      explosionArea :{ width:  `${20 * 1.5}px`},
      bulletExist: true,
    }
  },
  props:{
    // explosionRadius: Number,
    // triggerArea: Number,
    // explode: Boolean,
    // rady: Boolean,
    id: Number,
  },
  methods:{
    getTriggerArea(){
      // console.warn('gettriggerarea');
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
      if (!bullet) {

      }else{
      const radiusNow = {
                width:  `${bullet.radius * 1.5}px`,
              };
              this.triggerArea = radiusNow;
              // console.warn(bullet.radius);

              // return radiusNow;
    }
  },

  getExplosionArea(){
      // console.warn('get explosion radius');
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
      if (!bullet) {

      }else{
      const radiusNow = {
                width:  `${bullet.damageRadius * 1.5}px`,
              };
              this.explosionArea = radiusNow;
              // console.warn(bullet.damageRadius);
              // return radiusNow;
              // return radiusNow;
    }
  },

  selfKill(){
    console.warn('set kill - 0.12 sec');
    let timeoutA = setTimeout(() => {
      this.beforeDestroy();
    }, 5000);
    timeoutA;
    let timeoutB = setTimeout(() => {
      this.destroy();
    }, 5100);
    timeoutB;
  },
  beforeDestroy() {
    this.bulletExist = false;
  },
  destroy(){
    // this.$off();
    // this.$destroy();
    if(this.$el.parentNode){
      this.$el.parentNode.removeChild(this.$el);
    }
  }
},

  computed:{

    // checkDie(){
    //   const bullet = store.bullets.find(bullet => bullet.id === this.id);
    //   if(!bullet){
    //     let cip = bullet.cord.x
    //     console.log('check', cip);
    //   }else{
    //     let cip = bullet.cord.x
    //     console.log('check', cip);
    //     return cip;
    //   }
    //   // store.bullets[id].life = 
    // },

    bulletCssUpgrade(){
      if(this.bulletExist){
      // console.log('css upgrade')
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
        // Verifica se il proiettile è stato trovato nello store
        if (!bullet) {
        // Gestisci il caso in cui il proiettile non sia presente nello store
        // return {};
        }else{
          const styleNow = {
            left: `${bullet.cord.x}px`,
            top: `${bullet.cord.y}px`,
          };
          return styleNow;
        }
        }else{console.warn('KILLING bul up')}
      // Calcola le proprietà di stile in base alle coordinate e altre informazioni del proiettile
    },

    bulletRady(){
      // console.log('bullet rady');
      if(this.bulletExist){
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
      if(bullet.rady){
        return true;
      }else{
        return false;
      }
    }else{console.warn('KILLING bullet rady')}
    },

    bulletExplode(){
      // console.log('bullet explode', this.id);
      if(this.bulletExist){
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
      if(bullet.explode){
        return true;
      }else{
        return false;
      }
    }else{console.warn('KILLING explode')}
    },
  },

  mounted(){
    // this.getTriggerArea();
    // this.getExplosionArea();
    this.selfKill();
  }
}
</script>

<template>
  <div class="bullet" :class="bulletRady ? 'rady' : '' "  
      :style="bulletCssUpgrade">

        <div 
          class="explosion" 
          :class="bulletExplode ? 'active' : ''"  
          :style="explosionArea">
        </div>
        
      <div class="trigger-area"  :style="triggerArea"></div>

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