<script>
import {store} from './data/store';
import StartWavesModal from './components/partials/startWavesModal.vue';
import EndGameModal from './components/partials/endGameModal.vue';
import Main from './components/main.vue';
import {playMusic} from './functions/audio';
export default {
  name: 'App',
  data(){
    return{
      store,
    }
  },
  components : {
    Main,
    StartWavesModal,
    EndGameModal,
  },
  methods:{
    playMusic(where){
      playMusic(where);
    }
  },
  mounted(){
    this.playMusic(0);
  }
}
</script>

<template>
<div class="main-wrapper">
    <StartWavesModal v-if="!store.gameStatus.endGame" />

    <EndGameModal v-if="store.gameStatus.endGame && !store.gameStatus.onMatch"/>

    <Main />

</div>
</template>

<style lang="scss">
@import'./scss/main.scss';
</style>

