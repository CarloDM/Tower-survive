<script>
import {store} from '../../data/store';
export default {
name: 'Tower',
data() {
  return {
    store,
    angoloTorretta: 0, // Angolo di puntamento corrente della torretta
  };
},
methods: {
  
  aggiornaAngoloPuntamento() {
    setInterval(() => {
      
      const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
      const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
      const oggettoX = store.enemy.cord.x; /* Coordinata X dell'oggetto nemico */
      const oggettoY = store.enemy.cord.y;/* Coordinata Y dell'oggetto nemico */

      calcolaAngolo(torrettaX,torrettaY,oggettoX,oggettoY);
      function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
      const deltaX = oggettoX - torrettaX;
      const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate

      let angoloInRadianti = Math.atan2(deltaY, deltaX);
      let angoloInGradi = angoloInRadianti * (180 / Math.PI);

  // Adatta l'angolo in base al sistema di coordinate desiderato
      angoloInGradi = (450 - angoloInGradi) % 360;
      console.log(angoloInGradi);
      store.tower.rotation = angoloInGradi;
      
}
      // // Aggiorna l'angolo di puntamento della torretta
      // this.angoloTorretta = angolo;
    }, 1000 / 120);
  }
},
mounted() {
  this.aggiornaAngoloPuntamento();
},

props:{
  
}
}
</script>

<template>
  <div class="tower visible" 
  :style="{ transform: `rotate(${store.tower.rotation}deg)`,
            left: store.tower.cord.x + 'px',
            top: store.tower.cord.y + 'px', 
          }"> 

          <div class="cannon visible"></div>
  </div>
  
</template>


<style lang="scss" scoped>
.tower{
  position: absolute;
  // left: 300px; /* Posiziona al centro orizzontalmente */

  // top: 600px; /* Posiziona nella parte inferiore con uno spazio di 10px */
  transform: translate(-50%,-50%); /* Centra orizzontalmente */
  // transform: rotate();

  // clip-path: polygon(0% 0%, 0% 0%,
  //                   0% 100%,
  //                   100% 100%,
  //                   100% 0%,
                    
  // ); 

  overflow: visible;
  background-color: rgb(13, 14, 12);
  width: 80px;
  height: 80px;

  & .cannon{
    background-color: rgb(41, 53, 34);
    position: relative;
    transform: translate(-50%,-50%);
    top: 0%;
    left: 50%;
    width: 15px;
    height: 75px;
    z-index: 999;
  }
}
</style>
