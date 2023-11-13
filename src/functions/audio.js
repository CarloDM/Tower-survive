
const voxSupershot = new Audio('../../public/audio//vocal/voxSuperShot.mp3');
const voxMachineGun = new Audio('../../public/audio//vocal/voxMachineGun.mp3');
const voxAllCritical = new Audio('../../public/audio//vocal/voxAllCritical.mp3');

const voxWave1 = new Audio('../../public/audio/vocal/voxW1.mp3');
const voxWave2 = new Audio('../../public/audio/vocal/voxW2.mp3');
const voxWave3 = new Audio('../../public/audio/vocal/voxW3.mp3');
const voxWave4 = new Audio('../../public/audio/vocal/voxW4.mp3');
const voxWave5 = new Audio('../../public/audio/vocal/voxW5.mp3');
const voxWave6 = new Audio('../../public/audio/vocal/voxW6.mp3');
const voxWave7 = new Audio('../../public/audio/vocal/voxW7.mp3');
const voxWave8 = new Audio('../../public/audio/vocal/voxW8.mp3');
const voxWave9 = new Audio('../../public/audio/vocal/voxW9.mp3');
const voxWave10 = new Audio('../../public/audio/vocal/voxW10.mp3');
const voxWave11 = new Audio('../../public/audio/vocal/voxW11.mp3');
const voxWave12= new Audio('../../public/audio/vocal/voxW12.mp3');
const voxWave13= new Audio('../../public/audio/vocal/voxW12.mp3');
const voxWave14 = new Audio('../../public/audio/vocal/voxW12.mp3');
const voxWaveFinal = new Audio('../../public/audio/vocal/voxWFinal.mp3');

// ---------------------
const shot1 = new Audio('../../public/audio/foley/shot1.mp3');
const shot2 = new Audio('../../public/audio/foley/shot2.mp3');
const shot3 = new Audio('../../public/audio/foley/shot3.mp3');
const shot4 = new Audio('../../public/audio/foley/shot4.mp3');
const shotC1 = new Audio('../../public/audio/foley/shotcritical1.mp3');
const shotC11 = new Audio('../../public/audio/foley/shotcritical1.mp3');
const shotC2 = new Audio('../../public/audio/foley/shotcritical2.mp3');
const shotC22 = new Audio('../../public/audio/foley/shotcritical2.mp3');
[shotC1,shotC11, shotC2, shotC22, shot1, shot2, shot3, shot4].forEach(audio => {
  audio.load(); 
  audio.volume = 0.5;
});



export{sayWhichBoost,sayWhichwave, foleyShot}
// --------------
function sayWhichBoost(choice) {
  switch (choice){
    case 1: voxMachineGun.play(); break;
    case 2: voxAllCritical.play(); break;
    case 3: voxSupershot.play(); break;
    case 4: console.log('healt'); break;
  }
}
function sayWhichwave(wave){
  switch (wave) {
    case 1: voxWave1.play(); break;
    case 2: voxWave2.play(); break;
    case 3: voxWave3.play(); break;
    case 3: voxWave3.play(); break;
    case 4: voxWave4.play(); break;
    case 5: voxWave5.play(); break;
    case 6: voxWave6.play(); break;
    case 7: voxWave7.play(); break;
    case 8: voxWave8.play(); break;
    case 9: voxWave9.play(); break;
    case 10: voxWave10.play(); break;
    case 11: voxWave11.play(); break;
    case 12: voxWave12.play(); break;
    case 13: voxWave13.play(); break;
    case 14: voxWave14.play(); break;
    case 15: voxWaveFinal.play(); break;
  }
}

function foleyShot(critical){
  if(critical){

    const random = rand(1,5);
    switch (random){
        case 1: console.log('CRITICAL SHOT', 1);
          if(shotC1.paused){
            shotC1.play()
          }else{
            console.log('non paused')
            shotC11.pause();
            shotC11.currentTime = 0;
            shotC11.play();
          }
        break;
        case 2: console.log('CRITICAL SHOT', 11);
          if(shotC11.paused){
            shotC11.play()
          }else{
            console.log('non paused')
            shotC1.pause();
            shotC1.currentTime = 0;
            shotC1.play();
          }
        break;
        case 3: console.log('CRITICAL SHOT', 22);
          if(shotC2.paused){
            shotC2.play()
          }else{
            console.log('non paused')
            shotC22.pause();
            shotC22.currentTime = 0;
            shotC22.play();
          }
        break;
        case 4: console.log('CRITICAL SHOT', 22);
          if(shotC22.paused){
            shotC22.play()
          }else{
            console.log('non paused')
            shotC2.pause();
            shotC2.currentTime = 0;
            shotC2.play();
          }
        break;
      }

  }else{

    const random = rand(1,5);
    switch (random){
      case 1: console.log('SHOT', 1);
        if(shot1.paused){
          shot1.play()
        }else{
          console.log('non paused')
          shot1.pause();
          shot1.currentTime = 0;
          shot1.play();
        }
      break;
      case 2: console.log('SHOT', 2);
        if(shot2.paused){
          shot2.play()
        }else{
          console.log('non paused')
          shot2.pause();
          shot2.currentTime = 0;
          shot2.play();
        }
      break;
      case 3: console.log('SHOT', 3);
        if(shot3.paused){
          shot3.play()
        }else{
          console.log('non paused')
          shot3.pause();
          shot3.currentTime = 0;
          shot3.play();
        }
      break;
      case 4: console.log('SHOT', 4);
        if(shot4.paused){
          shot4.play()
        }else{
          console.log('non paused')
          shot4.pause();
          shot4.currentTime = 0;
          shot4.play();
        }
      break;
    
    }
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
