<script>
import {store} from '../../data/store';
// import {calculateAverange} from '../../functions/game_Menagment';
export default {
  name:'EndGameModal',
  data(){
    return{
      store,
    }
  },
  methods:{
    // calculateAverange(){
    //   calculateAverange();
    // },
  },
  mounted(){
    // this.calculateAverange();
  },
}
</script>
<template>
  <div class="end-game-modal-container">

    <div class="end-game-list-container">

      <ul class="list">
        <li class="tr heading">
          <h6>Wave</h6>
          <h6>Kills</h6>
          <h6>Base Attacks</h6>
          <h6>Precision</h6>
          <h6>Enemies n.</h6>
          <h6>Retry</h6>
        </li>

        <li class="tr"
        v-for="(wave,index) in store.wavesComplete" :key="index">
          <span>{{ index +1 }}</span>
          <span>{{ wave.kills }}</span>
          <span>{{ wave.dead }}</span>
          <span>{{ wave.precision }} %</span>
          <span>{{ wave.totalEnemies }}</span>
          <span>{{ wave.restartNumb }}</span>
        </li>

        <li class="tr bg_greenLow">
          <span>Total</span>
          <span>Kills</span>
          <span>Base Attack</span>
          <span>Averange precision</span>
          <span>Enemies</span>
          <span>Retry</span>
        </li>
        <li class="tr">
          <span></span>
          <span v-for="(averange, index) in store.wavesCompletTot" :key="index"
          >
          {{ averange }}
        </span>
        </li>
        
        <li class="tr score">
          <span>Survivor Point</span>
          <span>Point</span>
          <span>Point</span>
          <span>Point</span>
          <span>Retry Point</span>
          <span>Score</span>
        </li>
        <li class="tr">
          <span>{{ store.survivorKillsPoint }}</span>
          <span>{{ store.killsPoint }}</span>
          <span>{{ store.deadPoint }}</span>
          <span>{{ store.precisionPoint }}</span>
          <span>{{ store.retrySum }}</span>
          <span style="color: rgb(247, 64, 64); font-weight: 700;">{{ store.finalScore }}</span>
        </li>
        <li class="end-line">
          <span>In this game, you fired {{ store.totalshotCounter }} shots</span>
        </li>
        
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped >
.end-game-modal-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(39, 39, 39);
  width: 100%;
  height: 100%;
  z-index: 20;
}
.end-game-list-container{
  width: 600px;
  height: 90%;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 25px 0px white;
  background-color: rgb(20, 20, 20);
  color: white;

}
.tr{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid white;
  & h6, span{
    display: inline-block;
    width: calc(100% / 6);
    text-align: center;
    font-size: 1.1rem;
  }
}
.heading{
  background-color: green;
}
.bg_greenLow{
  background-color: rgb(53, 83, 53);
}
.tr.score{
  background-color: rgb(131, 96, 1);
}
.end-line{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 35px;
  & span{
    width: 100%;
    text-align: center;
  }
}
</style>