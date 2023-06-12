<script>
import {store} from './data/store';
import Header from './components/header.vue';
import Main from './components/main.vue';
import ControlSurface from './components/control_surface.vue';
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
  }
}
</script>

<template>
<div class="main-wrapper container-fluid">
  <div class="d-flex  flex-row justify-content-around main_container m-auto debug">
    <Main class="main d-inline-block" />
    <Header class="" />
    
</div>
<ControlSurface />


</div>
</template>

<style lang="scss" >
@import'./scss/main.scss'
</style>
