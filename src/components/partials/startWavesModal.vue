<script>
import {store} from '../../data/store';
import {startBattle,upGradeUser} from '../../functions/game_Menagment'
export default {
  name:'StarWavesModal',
  data(){
    return{
      store,
    }
    
  },
  methods:{
    startBattle(){
      startBattle();
    },
    upGradeUser(key){
      upGradeUser(key);
    }
  }
}
</script>
<template>
  <div v-if="!store.gameStatus.onMatch"
  class="startWavesModal"
  >
    <div class="modal_container ">

      <section class="main_section">

        <div v-if="store.wavesCount == -1 && store.gameStatus.alive"
        class="modal_title">
          Start Game
        </div>
        <div v-if="store.wavesCount > -1 && store.gameStatus.alive"
        class="modal_title">
          Wave {{ store.wavesCount + 1 }} Complete
        </div>
        <div v-if="!store.gameStatus.alive" 
        class="modal_title">
          you loose
        </div>

        <div class="my_row ">

            <div class="info ">
              <ul v-if="store.wavesCount > -1" class="">
                <li>Kills:     {{ store.kills }}/{{ store.enemyCounter }}                       </li>
                <li>Shots:     {{ store.shotCounter }}                                          </li>
                <li>Precision: {{ ((store.shotGoals / store.shotCounter) * 100).toFixed(1) }}%  </li>
                <li>Health:     {{ ((store.userHealth /10000) *100).toFixed(1) }}%               </li>
              </ul>
            </div>

            <div class="action">
              <div 
              v-if="store.gameStatus.alive && store.gameStatus.upgradeAvailable === 0 || store.gameStatus.upgradesComplete"
              class="btn_start"
              @click="startBattle"
              >
                  <h4 >START! </h4>
              </div>

              <div 
              v-if="store.gameStatus.upgradeAvailable !== 0"
              class="btn_start"
              >
                  <h4 >{{store.gameStatus.upgradeAvailable}} more upgrade </h4>
              </div>

              <div v-if="!store.gameStatus.alive"
              class="btn_start"
              >
                  <h4>retry</h4>
              </div>
            </div>

        </div>
      </section>

      <section class="upgrade">

          <div @click="upGradeUser('damage')"
          class="btn_upgrade"
          :class="{
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.user.damage >= 360), 
            }">
            <h6>Damage</h6>
            <p>+ 40</p>
            <p>{{store.user.damage }} / 360</p>
          </div>

          <div @click="upGradeUser('explosionRadius')" 
          class="btn_upgrade"
          :class="{
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.user.explosionRadius >= 40), 
            }">
            <h6>Damage Radius</h6>
            <p>+ 10</p>
            <p>{{store.user.explosionRadius }} / 40</p>
          </div>
          
          <div @click="upGradeUser('bulletsVelocity')" 
          class="btn_upgrade"
          :class="{
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.user.bulletsVelocity >= 8), 
            }">
            <h6>Bullet Velocity</h6>
            <p>+ 2</p>
            <p>{{store.user.bulletsVelocity }} / 8</p>
          </div>

          <div @click="upGradeUser('rateOfFire')" 
          class="btn_upgrade"
          :class="{
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.user.rateOfFire >= 13), 
            }">
            <h6>Rate of Fire</h6>
            <p>+ 1</p>
            <p>{{store.user.rateOfFire }} / 13</p>
          </div>

          <div @click="upGradeUser('fortune')" 
          class="btn_upgrade"
          :class="{
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.wavesCount <= 6 ||store.user.fortune >= 10 ), 
            }"
          >
            <h6>Fortune</h6>
            <p>+ 1%</p>
            <p>{{store.user.fortune }} / 10%</p>
          </div>

      </section>

    </div>
  </div>
</template>
<style lang="scss" scoped>
  .startWavesModal{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 300px;
    padding: 10px;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgb(186, 206, 167);
    border: 5px solid rgb(122, 122, 122);
    border-radius: 10px;
    box-shadow: 0px 0px 150px 100px black;
  }
  .modal_container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  section{
      width: 100%;
    }
  .main_section{
    display: flex;
    flex-direction: column;
    height: 60%;
  }
  .modal_title{
    padding-top: -10px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    word-spacing: 10px;
    font-size: 1.3rem;
    font-weight: 800;
    height: 20%;
  }
  .my_row{
    height: 80%;
    display: flex;
    & .info{
      width: calc(20% * 3);
      padding: 20px;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }
    & .action{
      width: calc(20% * 2);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .btn_start{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    aspect-ratio: 1.40/1;
    border-radius: 20px;
    border: 3px solid black;
    background-color: yellow;
    & h4{
      text-align: center;
      user-select: none;
      color: rgb(0, 0, 0);
    }
  }
  .upgrade{
    display: flex;
    justify-content: space-around;
    height: 40%;
  }
  .btn_upgrade{
    width: calc(95% / 5);
    text-align: center;
    background-color: rgb(109, 156, 94);
    border: 1px solid rgb(123, 255, 83);
    box-shadow: inset 0px 0px 20px 0px rgb(123, 255, 83);
    padding: 5px;
    user-select: none;
    cursor: pointer;
    line-height: 0.8rem;
    & h6{
      line-height: 01rem;
      height: 35px;
    }
  }
  .off{
    filter: grayscale(1);
    opacity: 0.4;
    pointer-events: none;
  }

</style>