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
methods: {},
props:{}
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
  // transform: translate(-50%,-50%); /* Centra orizzontalmente */
  // transform: rotate();

  // clip-path: polygon(0% 0%, 0% 0%,
  //                   0% 100%,
  //                   100% 100%,
  //                   100% 0%,
                    
  // ); 

  // overflow: visible;
  background-color: rgba(13, 14, 12, 0.24);
  width: 60px;
  height: 60px;
  margin-top: -25px;
  margin-left: -25px;

  & .cannon{
    background-color: rgba(41, 53, 34, 0.308);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 0%;
    left: 50%;
    width: 15px;
    height: 75px;
    z-index: 999;
  }
}
</style>
