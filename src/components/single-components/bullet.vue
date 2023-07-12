<script>
import {store} from '../../data/store';
export default {
  name:'Bullet',
  components:{},
  data(){
    return{
      bulletExist: true,
      explodeUpgrade: false,
      damageRadius:null,

    }
  },
  props:{

    explode: Boolean,
    id: Number,
    // bullet: Object,
  },

  methods:{

    selfKill(){
      console.log('bullet:', this.id, 'was shot... set auto-delete -5.1 sec');
      // let timeoutA = setTimeout(() => {
      //   this.beforeDestroy();
      // }, 3000);
      // timeoutA;
      let timeoutB = setTimeout(() => {
        this.destroy();
      }, 3100);
      // timeoutB;
    },

    beforeDestroy() {
      this.bulletExist = false;
    },

    destroy(){
      
    if(this.$el.parentNode){
      // console.warn('self-delete Bullet id:', this.id);
      this.$el.parentNode.removeChild(this.$el);
    }
    },

  },

  computed:{
    getDamageRadius(){
      console.warn('try', this.id , store.bullets)
      const damRadius = {width: `${store.bulletsDmgRadius * 2}px`,};
      // this.damageRadius = damRadius;
      return damRadius;
    },


    bulletCssUpgrade(){
      if(this.bulletExist){

      const bullet = store.bullets.find(bullet => bullet.id === this.id);
        // Verifica se il proiettile è stato trovato nello store
        if (bullet) {
          const cordNow = {
            left: `${bullet.cord.x}px`,
            top: `${bullet.cord.y}px`,
          };
          return cordNow;
        }
      }
      // Calcola le proprietà di stile in base alle coordinate e altre informazioni del proiettile
    },

    bulletRady(){

      if(this.bulletExist){

        const bullet = store.bullets.find(bullet => bullet.id === this.id);
        if(bullet.rady){
          return true;
        }else{
          return false;
        }
      }
    },

    bulletExplode(){

      if(this.bulletExist){
      const bullet = store.bullets.find(bullet => bullet.id === this.id);
      if(bullet.explode){
        return true;
      }else{
        return false;
      }
    }
    },
  },

  mounted(){

    this.selfKill();
  }
}
</script>

<template>
  <div class="bullet" :class="bulletRady ? 'rady' : '' "  
      :style="bulletCssUpgrade">

        <div v-if="explode"
          class="explosion" 
          :style="getDamageRadius"
          >
            <!-- :style="'width:' + bullet.damageRadius * 1.5 + 'px'" -->
        </div>
        
        <!-- <div class="trigger-area"  :style="'width:' + bullet.radius * 1.5 + 'px'"></div> -->

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



  & .trigger-area{
    position: absolute;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    border: 2px dashed rgba(160, 221, 110, 0.247);
  }
}
.explosion {
    position: absolute;
    // width: 300px;
    aspect-ratio: 1/1;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    background-color: rgba(219, 151, 48, 0.192);
  }
</style>