<script>
import { computed } from 'vue';
import {store} from '../data/store';
export default {
  name: 'Header',
  data(){
    return{
      store,
    }
  },

  computed : {
    getFrame(){
      const frm = store.frameCount;
      return frm;
    },
    getkills(){
      const kills = store.kills;
      return kills;
    },

  },
  
}
</script>

<template>
<header class="right_bar p-3 d-inline-block">
  <h5>Game Info:</h5>
  <ul>
    <li class="">proiettili sparati:
    {{ store.shotCounter }}
    </li>
    <li class="">nemici generati:
    {{ store.enemyCounter }}
    </li>
    <li class="">uccisioni:
    {{ getkills }}
    </li>
    <li class="">soldati in vita:
    {{  store.enemyCounter -  store.dead - store.kills }}
    </li>
    <li class="">soldi:
    {{ store.money }}
    </li>
    <li class="">
      <!-- <h5>FRAME</h5> -->
      <!-- <P> {{ getFrame }}</P> -->
      <!-- <P>SEC: {{ ((store.frameCount)  /12) }}</P> -->
  
    </li>
  </ul>

</header>
</template>


<style lang="scss" scoped>

  .right_bar{
    width: 180px;
    font-size: 0.9rem;
    background-color: grey;
    & ul{
      
      padding: 10px;
      list-style: none;
    }
  } 

</style>