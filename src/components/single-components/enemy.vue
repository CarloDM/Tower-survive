<script>
import {store} from '../../data/store';
import {animazioneMovimentoVerticale} from '../../functions/gameLogic'
export default {
name: 'Enemy',
data() {
  return {
    store,
    enemyY: 0, // Coordinata Y corrente dell'oggetto nemico
  };
},
methods: {},
mounted(){
  // animazioneMovimentoVerticale(store.enemy);
},

props:{
  
}

}
</script>

<template>
  <div class="enemy" :style="{  left: store.enemy.cord.x + 'px' , top: store.enemy.cord.y + 'px',} ">

  </div>
  
</template>


<style lang="scss" scoped>
.enemy{
  position: absolute;
  // left: calc( (600px) - 40px);  /* Posiziona al centro orizzontalmente */
  // bottom: calc( (600px) - 40px); /* Posiziona nella parte inferiore con uno spazio di 10px */
  // transform: translate(-50%,-50%); /* Centra orizzontalmente */
  background-color: rgb(61, 70, 80);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
