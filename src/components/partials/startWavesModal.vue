<script>
import {store} from '../../data/store';
import {startBattle,upGradeUser,restart, getBestRecord} from '../../functions/game_Menagement';
import {musicLowLoud, musicHightLoud, musicFinalWaveFade, sayWhichwave,playMusic} from '../../functions/audio';
export default {
  name:'StarWavesModal',
  data(){
    return{
      store,
    }
  },
  watch: {
    'store.gameStatus.onMatch'(n,o){
      if (!n){
        musicLowLoud(); 
      }
    }
  },
  methods:{
    getBestRecord(){
      getBestRecord();
      
    },

    startBattle(){
      startBattle();
      if(store.wavesCount <= 12){
        musicHightLoud();
      }else if (store.wavesCount === 13){
        musicFinalWaveFade();
      }
    },
    restart(){
      restart();
    },
    upGradeUser(key){
      upGradeUser(key);
    },
    musicLowLoud(){
      musicLowLoud();
    },
    musicHightLoud(){
      musicHightLoud();
    },
    sayWhichwave(wave){
      sayWhichwave(wave);
      setTimeout(() => {
        playMusic(0);
      }, 3150);

    }
  },
  mounted(){
    getBestRecord();
    this.musicLowLoud();
  }
}
</script>
<template>
  <div v-if="!store.gameStatus.onMatch"
  class="startWavesModal"
  >
    <div class="modal_container ">

      <section class="main_section">

        <div class="title_container">

            <div v-if="store.wavesCount == -1 && store.gameStatus.alive"
            class="modal_title">
              <h4>Start Game </h4> 
            </div>
            <div v-if="store.wavesCount > -1 && store.gameStatus.alive"
            class="modal_title">
            <h4> Wave {{ store.wavesCount + 1 }} Complete </h4> 
            </div>
            <div v-if="!store.gameStatus.alive" 
            class="modal_title">
            <h4> you loose </h4> 
            </div>

            
              <img v-if="store.wavesCount == -1 && store.gameStatus.alive"
              @click="sayWhichwave(0)" class="audio_btn"  src="../../assets/volume-high-solid.svg" alt="">

              <!-- <img v-if="store.wavesCount == -1 && store.gameStatus.alive"
              @click="" class="tutorial_btn"  src="../../assets/clipboard-question-solid.svg" alt=""> -->
            

      </div>

        <div class="my_row ">

            <div class="info ">
              <ul v-if="store.wavesCount > -1" class="">
                <li>Kills:     {{ store.kills }}/{{ store.enemyCounter }}                       </li>
                <li>Shots:     {{ store.shotCounter }}                                          </li>
                <li>Precision: {{ ((store.shotGoals / store.shotCounter) * 100).toFixed(1) }}%  </li>
                <li>Health:    {{ ((store.userHealth /10000) *100).toFixed(1) }}%               </li>
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
              v-if="store.gameStatus.upgradeAvailable !== 0 && store.gameStatus.alive"
              class="btn_start"
              >
                  <h4 >{{store.gameStatus.upgradeAvailable}} more upgrade </h4>
              </div>

              <div v-if="!store.gameStatus.alive"
              class="btn_start"
              @click="restart"
              >
                  <h4>retry</h4>
              </div>
            </div>

        </div>
      </section>

      <section v-if="store.gameStatus.alive"
      class="upgrade">

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
            'off' : (store.gameStatus.upgradeAvailable <= 0 || store.wavesCount <= 9 ||store.user.fortune >= 10 ), 
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
