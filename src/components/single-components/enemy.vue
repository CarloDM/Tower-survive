<script>
import {store} from '../../data/store';
import {animazioneMovimentoVerticale} from '../../functions/gameLogic';
import LifeBar from '../single-components/lifeBar.vue';
export default {
name: 'Enemy',
data() {
  return {
    store,
  };
},
props:{
  id: Number,
  health: Number,
  alive: Boolean,
},
components: {LifeBar},
methods: {},
computed:{
  // updateHealt(){
  //   // console.log('enemy',this.id, this.health)
  //   const  health = store.army[id].health
  //   return health
  // },
},
mounted(){
  // animazioneMovimentoVerticale(store.army[0]);
},
}
</script>

<template>
  <div class="enemy" :class="!(alive) ? 'dead' : '' " :style="{  left: store.army[id].cord.x + 'px' , top: store.army[id].cord.y + 'px',} ">

    <p>{{ health }}</p>

    <LifeBar :health="health" />
  </div> 

</template>


<style lang="scss" scoped>
.enemy{
  position: absolute;
  z-index: 999;
  // left: calc( (600px) - 40px);  /* Posiziona al centro orizzontalmente */
  // bottom: calc( (600px) - 40px); /* Posiziona nella parte inferiore con uno spazio di 10px */
  // transform: translate(-50%,-50%); /* Centra orizzontalmente */
  background-color: rgb(61, 70, 80);
  width: 30px;
  aspect-ratio: 1/1;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  font-size: 0.7rem;

  &.dead{
    opacity: 0.1;
    z-index: 0;
  }
}
</style>
