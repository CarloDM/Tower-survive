<script>
import {store} from '../data/store';
export default {
  name: 'Header',
  data(){
    return{
      store,
    }
  }
  
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
    {{ store.kills }}
    </li>
    <li class="">soldati in vita:
    {{  store.enemyCounter -  store.dead - store.kills }}
    </li>
    <li class="">soldi:
    {{ store.money }}
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