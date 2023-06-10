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
<div class="main-wrapper container-fluid debug">
<Header />
<Main />
<ControlSurface />


</div>
</template>

<style lang="scss" >
@import'./scss/main.scss'
</style>
