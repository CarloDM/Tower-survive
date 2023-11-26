<script>
import {store} from '../../data/store';
import enemy from '../single-components/enemy.vue';
import tower from '../single-components/tower.vue';
export default {
  name:'TutorialModal',
  data(){
    return{
      store,
    }
  },
  components:{enemy,tower},
  watch: {

  },
  methods:{

  },
  mounted(){

  }
}
</script>
<template>
  <div class="tutorial_modal ">
    <div class="modal_container tutorial_container">

      <section class="tutorial_section  ">
        <div class="section-column ">

          <div class="enemy-card  ">
              <div class="enemy low-armor very-slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span>Vary Slow</span>
          </div>
          
          <div class="enemy-card  ">
              <div class="enemy low-armor slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span>Slow</span>
          </div>

          <div class="enemy-card  ">
              <div class="enemy low-armor fast"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span>Fast</span>
          </div>

          <div class="enemy-card  ">
              <div class="enemy low-armor very-fast"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span>Very Fast</span>
          </div>

          <div class="enemy-card  ">
              <div class="enemy low-armor ultra-fast"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span>Furious</span>
          </div>

        </div>

        <div class="section-column ">

          <div class="enemy-card ">
              <div class="enemy low-armor slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span class="">Low HP > 400</span>
          </div>
          
          <div class="enemy-card ">
              <div class="enemy mid-armor slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span class="">Mid HP > 1200</span>
          </div>
          <div class="enemy-card ">
              <div class="enemy high-armor slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span class="">High HP > 300</span>
          </div>
          <div class="enemy-card ">
              <div class="enemy big-armor slow"
              style="top:15px;left: 15px;">
              <p>HP</p>
              </div>
              <span style="margin-top: 10px;">Big HP > 10000</span>
          </div>

        </div>
      </section>

      <section class="tutorial_section ">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, a.</p>
      </section>

      <section class="tutorial_section ">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, a.</p>
      </section>

      <section class="tutorial_section ">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, a.</p>
      </section>
      
    </div>
  </div>
</template>
