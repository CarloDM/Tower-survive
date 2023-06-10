<script>
import {store} from '../../data/store';
export default {
name: 'Enemy',
data() {
  return {
    store,
    enemyY: 0, // Coordinata Y corrente dell'oggetto nemico
  };
},
methods: {
  animazioneMovimentoVerticale() {
    const altezzaCampoBattaglia = 650; // Altezza del campo di battaglia
    const velocitaMovimento = 0.5; // Velocità di movimento in pixel per frame (puoi regolare il valore)


    setInterval(() => {
      // Calcola la nuova coordinata Y in base alla velocità
      this.enemyY += velocitaMovimento;
      this.enemyx = store.enemy.cord.x;
      store.enemy.cord.y += velocitaMovimento;
      // console.log(store.enemy.cord.y)

      // Verifica se l'oggetto nemico ha superato l'altezza del campo di battaglia
      if (this.enemyY > altezzaCampoBattaglia ) {
        // Riposiziona l'oggetto nemico all'inizio del campo di battaglia
        this.enemyY = 0; store.enemy.cord.y = 0;
      }
    }, 1000 / 60); // Esegui l'animazione a 60 frame al secondo (puoi regolare il valore)
  },
},
mounted() {
  this.animazioneMovimentoVerticale();
},

props:{
  
}

}
</script>

<template>
  <div class="enemy" :style="{  left: enemyx + 'px' , top: enemyY + 'px',} ">

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
