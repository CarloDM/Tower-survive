<script>
import {store} from '../data/store';
import {bulletShot,animazioneMovimentoVerticale,aggiornaAngoloPuntamento,closestSoldier,rand} from '../functions/gameLogic';
export default {
  name:'ControlSurface',
  data(){
    return{
      store,
      // proiettili: ref([])
    }
  },
  components:{},
  methods:{
    animEnemy(){
      store.army.forEach(enemy => {
        animazioneMovimentoVerticale(enemy)
      });
    },
    enemypush(numb){
      for (let index = 0; index < numb; index++) {
        store.enemyCounter ++;
        const newEnemy =
              {cord : {x:150,y:0}, id:0,
              health: 1000, alive: true,};
              newEnemy.cord = {x:rand(50,550),y:rand(-160, -50)};
              newEnemy.id = store.enemyCounter;
  
              store.army.push(newEnemy);
              animazioneMovimentoVerticale(store.army[store.army.length - 1])
              ;
      }
    },
    newshot(){
      store.shotCounter ++;
      const nshot =
      {
      id: 0,
      cord : {x:300,y:520},
      timeout: 20,
      radius: 30,
      velocity: 5,
      damage : 650,
      damageRadius: 100,
      explode: false,
      stop:false,
      autonomy: 440,
      rady: false,
      }
      nshot.id = store.shotCounter;
      store.bullets.push(nshot);
      bulletShot(
        store.bullets.find(item => item['id'] === nshot.id),
        store.tower.rotation,
        store.bullets.find(item => item['id'] === nshot.id).velocity
        )
    },
    autoShot(){
      store.autoShot = !store.autoShot;
      if(store.autoShot){
        const mitra = setInterval(() => {
          this.newshot();
          if(!store.autoShot){
            clearInterval(mitra);
          }
        }, 200);
      }else{}
    },
    stopTower(){
      console.log(store.tower.aim);
    },
    autoAim(){
      aggiornaAngoloPuntamento(closestSoldier(store.army));
    },

    deleteArmy(){
      store.army = [];
    store.bullets = [];
    },


  },
  props:{},
  mounted(){
  }
}
</script>

<template>
  <div class="control-surface d-flex flex-wrap m-auto">


  <button @click="newshot()" class="btn">spara</button>
  <button @click="autoShot()" class="btn">mitra</button>
  <button @click="animEnemy()" class="btn">anim y</button>
  <button @click="enemypush(10)" class="btn">enemypush</button>
  <button @click="autoAim()" class="btn">auto aim</button>
  <button @click="deleteArmy()" class="btn">clean array</button>





  </div>
</template>

<style lang="scss" scoped>
.btn{
  width: 100px;
  height: 40px;
  background-color: rgb(192, 192, 192);
}
</style>