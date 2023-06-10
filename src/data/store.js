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

  enemy : {cord : {x:150,y:20}, healt: 1000},

  bullet: {
          cord : {x:300,y:520},
          direction : {x:300,y:520},
  }


})