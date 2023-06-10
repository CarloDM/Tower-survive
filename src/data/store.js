import {reactive} from 'vue';
export const store = reactive ({

  tower : {
          cord : {x:300,y:520},
          rotation : 0,
          attak: 1},
  
  shot: {
    cord : {x:300,y:520},
    propiety: {explosionArea: 1, speed:20, explosionTime: 40}
  },

  enemy : {cord : {x:456,y:0},attak: 1}


})