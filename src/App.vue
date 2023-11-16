<script>
// import Worker from "worker-loader/Worker.js";
import {store} from './data/store';
import Header from './components/header.vue';
import Main from './components/main.vue';
import ControlSurface from './components/control_surface.vue';
import StartWavesModal from './components/partials/startWavesModal.vue';
export default {
  name: 'App',
  data(){
    return{
      store,
    }
  },
  components : {
    Header,
    Main,
    ControlSurface,
    StartWavesModal,
    
  },
  methods:{},
  
}
</script>

<template>

<div class="main-wrapper container-fluid"  >
  <div class="d-flex  flex-row justify-content-around main_container m-auto debug"
    >

    <StartWavesModal/>
    <Main />
    
  </div>
</div>
</template>

<style lang="scss" >
@import'./scss/main.scss';
</style>
