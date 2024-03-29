const music1 = new Audio('../../audio/music/RocketTowerSurvive_Soundtrack.mp3');
music1.load(); music1.volume = 0.15; // 0.5 a regime

const voxSupershot =   new Audio('../../audio/vocal/voxSuperShot.mp3');
const voxMachineGun =  new Audio('../../audio/vocal/voxMachineGun.mp3');
const voxAllCritical = new Audio('../../audio/vocal/voxAllCritical.mp3');
const voxHealth =      new Audio('../../audio/vocal/voxHealth.mp3');

const voxWave1 =     new Audio('../../audio/vocal/voxW1.mp3');
const voxWave2 =     new Audio('../../audio/vocal/voxW2.mp3');
const voxWave3 =     new Audio('../../audio/vocal/voxW3.mp3');
const voxWave4 =     new Audio('../../audio/vocal/voxW4.mp3');
const voxWave5 =     new Audio('../../audio/vocal/voxW5.mp3');
const voxWave6 =     new Audio('../../audio/vocal/voxW6.mp3');
const voxWave7 =     new Audio('../../audio/vocal/voxW7.mp3');
const voxWave8 =     new Audio('../../audio/vocal/voxW8.mp3');
const voxWave9 =     new Audio('../../audio/vocal/voxW9.mp3');
const voxWave10 =    new Audio('../../audio/vocal/voxW10.mp3');
const voxWave11 =    new Audio('../../audio/vocal/voxW11.mp3');
const voxWave12 =    new Audio('../../audio/vocal/voxW12.mp3');
const voxWave13 =    new Audio('../../audio/vocal/voxW13.mp3');
const voxWave14 =    new Audio('../../audio/vocal/voxW14.mp3');
const voxWaveFinal = new Audio('../../audio/vocal/voxWFinal.mp3');
const voxWaveWelcome = new Audio('../../audio/vocal/voxWelcome.mp3');
[voxWave1,voxWave2,voxWave3,voxWave4,voxWave5,voxWave6,voxWave7,voxWave8,voxWave9,voxWave10,voxWave11,voxWave12,voxWave13,voxWave14,voxWaveFinal,voxWaveWelcome].forEach(audio => {
  audio.load(); 
  audio.volume = 1;
});

const voxAssistantDanger1 = new Audio('../../audio/vocal/voxAssistant_danger1.mp3');
const voxAssistantDanger2 = new Audio('../../audio/vocal/voxAssistant_danger2.mp3');
const voxAssistantDanger3 = new Audio('../../audio/vocal/voxAssistant_danger3.mp3');
const voxAssistantDanger4 = new Audio('../../audio/vocal/voxAssistant_danger4.mp3');
const voxAssistantDanger5 = new Audio('../../audio/vocal/voxAssistant_danger5.mp3');
const voxAssistantDanger6 = new Audio('../../audio/vocal/voxAssistant_danger6.mp3');
const voxAssistantDanger7 = new Audio('../../audio/vocal/voxAssistant_danger7.mp3');
const voxAssistantImpact1 = new Audio('../../audio/vocal/voxAssistant_impact1.mp3');
const voxAssistantImpact2 = new Audio('../../audio/vocal/voxAssistant_impact2.mp3');
const voxAssistantImpact3 = new Audio('../../audio/vocal/voxAssistant_impact3.mp3');
const voxAssistantImpact4 = new Audio('../../audio/vocal/voxAssistant_impact4.mp3');
const voxAssistantImpact5 = new Audio('../../audio/vocal/voxAssistant_impact5.mp3');
const voxAssistantImpact6 = new Audio('../../audio/vocal/voxAssistant_impact6.mp3');
const voxAssistantRage1 = new Audio('../../audio/vocal/voxAssistant_rage1.mp3');
const voxAssistantRage2 = new Audio('../../audio/vocal/voxAssistant_rage2.mp3');
const voxAssistantRage3 = new Audio('../../audio/vocal/voxAssistant_rage3.mp3');
const voxAssistantRage4 = new Audio('../../audio/vocal/voxAssistant_rage4.mp3');
const voxAssistantRage5 = new Audio('../../audio/vocal/voxAssistant_rage5.mp3');
[voxAssistantRage1,voxAssistantRage2,voxAssistantRage3,voxAssistantRage4,voxAssistantRage5,voxAssistantDanger1,voxAssistantDanger2,voxAssistantDanger3,voxAssistantDanger4,voxAssistantDanger5,voxAssistantDanger6,voxAssistantDanger7].forEach(audio => {
  audio.load(); 
  audio.volume = 1;
});
const voxAssistantRejoices1 = new Audio('../../audio/vocal/voxAssistant_rejoices1.mp3');
const voxAssistantRejoices2 = new Audio('../../audio/vocal/voxAssistant_rejoices2.mp3');
const voxAssistantRejoices3 = new Audio('../../audio/vocal/voxAssistant_rejoices3.mp3');
const voxAssistantRejoices4 = new Audio('../../audio/vocal/voxAssistant_rejoices4.mp3');
const voxAssistantRejoices5 = new Audio('../../audio/vocal/voxAssistant_rejoices5.mp3');

const voxAssistantFinal1 = new Audio('../../audio/vocal/voxAssistant_finalwave1.mp3');
const voxAssistantFinal2 = new Audio('../../audio/vocal/voxAssistant_finalwave2.mp3');


// ---------------------
const shot1 = new Audio('../../audio/foley/shot1.mp3');
const shot2 = new Audio('../../audio/foley/shot2.mp3');
const shot3 = new Audio('../../audio/foley/shot3.mp3');
const shot4 = new Audio('../../audio/foley/shot4.mp3');
const shotC1 = new Audio('../../audio/foley/shotcritical1.mp3');
const shotC11 = new Audio('../../audio/foley/shotcritical1.mp3');
const shotC2 = new Audio('../../audio/foley/shotcritical2.mp3');
const shotC22 = new Audio('../../audio/foley/shotcritical2.mp3');
[shotC1,shotC11, shotC2, shotC22, shot1, shot2, shot3, shot4].forEach(audio => {
  audio.load(); 
  audio.volume = 0.25 ;
});
const explosion1 = new Audio('../../audio/foley/explosion1.mp3');
const explosion11 = new Audio('../../audio/foley/explosion1.mp3');
const explosion2 = new Audio('../../audio/foley/explosion2.mp3');
const explosion22 = new Audio('../../audio/foley/explosion2.mp3');
const explosion3 = new Audio('../../audio/foley/explosion3.mp3');
const explosion33 = new Audio('../../audio/foley/explosion3.mp3');
const explosion4 = new Audio('../../audio/foley/explosion4.mp3');
const explosion44 = new Audio('../../audio/foley/explosion4.mp3');
const explosion5 = new Audio('../../audio/foley/explosion5.mp3');
const explosion55 = new Audio('../../audio/foley/explosion5.mp3');
const explosion6 = new Audio('../../audio/foley/explosion6.mp3');
const explosion66 = new Audio('../../audio/foley/explosion6.mp3');
const explosion7 = new Audio('../../audio/foley/explosion7.mp3');
const explosion77 = new Audio('../../audio/foley/explosion7.mp3');
[explosion1,explosion11,explosion2,explosion22,explosion3,explosion33,explosion4,explosion44,explosion5,explosion55,explosion6,explosion66,explosion7,explosion77].forEach(audio => {
  audio.load(); 
  audio.volume = 0.8 ;
});

export{sayWhichBoost,sayWhichwave, foleyShot, foleyExplosion, voxAssistantImpact,voxAssistantRejoices,voxAssistantRage, voxAssistantDanger, voxAssistantFinal, playMusic, musicLowLoud, musicHightLoud,musicFinalWaveFade}
// --------------
function playMusic(where){
  music1.currentTime = where;
  music1.play()
}
function musicLowLoud(){
  const fade = (0.25 - 0.45) / (1500 / 10); //millisecondi
  const fading = setInterval(()=>{
    if(music1.volume > 0.25 ){
      music1.volume += fade;
    } else {
      music1.volume = 0.25;
      clearInterval(fading);
    }
  },10)
}
function musicHightLoud(){
  const fade = (0.45 - 0.25) / (3000 / 10); //millisecondi
  const fading = setInterval(()=>{
    if(music1.volume < 0.45 ){
      music1.volume += fade;
    } else {
      music1.volume = 0.45;
      clearInterval(fading);
    }
  },10)
}
function musicFinalWaveFade(){
  music1.volume = 0;
  const fade = (0.45 - 0) / (10000 / 10); //millisecondi
  const fading = setInterval(()=>{
    if(music1.volume < 0.5 ){
      music1.volume += fade;
    } else {
      music1.volume = 0.45;
      clearInterval(fading);
    }
  },10)
}
function sayWhichBoost(choice) {
  switch (choice){
    case 1: voxMachineGun.play(); break;
    case 2: voxAllCritical.play(); break;
    case 3: voxSupershot.play(); break;
    case 4: voxHealth.play(); break;
  }
}
function sayWhichwave(wave){
  switch (wave) {
    case 0: voxWaveWelcome.play(); break;
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
    case 14: voxWaveFinal.play(); break;
  }
}

function foleyShot(critical){
  if(critical){

    const random = rand(1,5);
    switch (random){
        case 1: 
          if(shotC1.paused){
            shotC1.play()
          }else{
            shotC11.pause();
            shotC11.currentTime = 0;
            shotC11.play();
          }
        break;
        case 2: 
          if(shotC11.paused){
            shotC11.play()
          }else{
            shotC1.pause();
            shotC1.currentTime = 0;
            shotC1.play();
          }
        break;
        case 3: 
          if(shotC2.paused){
            shotC2.play()
          }else{
            shotC22.pause();
            shotC22.currentTime = 0;
            shotC22.play();
          }
        break;
        case 4: 
          if(shotC22.paused){
            shotC22.play()
          }else{
            shotC2.pause();
            shotC2.currentTime = 0;
            shotC2.play();
          }
        break;
      }

  }else{

    const random = rand(1,5);
    switch (random){
      case 1: 
        if(shot1.paused){
          shot1.play()
        }else{
          shot2.pause();
          shot2.currentTime = 0;
          shot2.play();
        }
      break;
      case 2: 
        if(shot2.paused){
          shot2.play()
        }else{
          shot3.pause();
          shot3.currentTime = 0;
          shot3.play();
        }
      break;
      case 3: 
        if(shot3.paused){
          shot3.play()
        }else{
          shot4.pause();
          shot4.currentTime = 0;
          shot4.play();
        }
      break;
      case 4: 
        if(shot4.paused){
          shot4.play()
        }else{
          shot1.pause();
          shot1.currentTime = 0;
          shot1.play();
        }
      break;
    
    }
  }
}
function foleyExplosion(){

    const random = rand(1,8);
    switch (random){
        case 1: 
          if(explosion1.paused){
            shotC1.play()
          }else{
            explosion11.pause();
            explosion11.currentTime = 0;
            explosion11.play();
          }
        break;
        case 2: 
          if(explosion2.paused){
            explosion2.play()
          }else{
            explosion22.pause();
            explosion22.currentTime = 0;
            explosion22.play();
          }
        break;
        case 3: 
          if(explosion3.paused){
            explosion3.play()
          }else{
            explosion33.pause();
            explosion33.currentTime = 0;
            explosion33.play();
          }
        break;
        case 4: 
          if(explosion4.paused){
            explosion4.play()
          }else{
            explosion44.pause();
            explosion44.currentTime = 0;
            explosion44.play();
          }
        break;
        case 5: 
          if(explosion5.paused){
            explosion5.play()
          }else{
            explosion55.pause();
            explosion55.currentTime = 0;
            explosion55.play();
          }
        break;
        case 6: 
          if(explosion6.paused){
            explosion6.play()
          }else{
            explosion66.pause();
            explosion66.currentTime = 0;
            explosion66.play();
          }
        break;
        case 7: 
          if(explosion7.paused){
            explosion7.play()
          }else{
            explosion77.pause();
            explosion77.currentTime = 0;
            explosion77.play();
          }
        break;
      }
}
function voxAssistantImpact(){

    const random = rand(1,7);
    switch (random){
        case 1: 
            voxAssistantImpact1.pause();
            voxAssistantImpact1.currentTime = 0;
            voxAssistantImpact1.play();
        break;
        case 2: 
            voxAssistantImpact2.pause();
            voxAssistantImpact2.currentTime = 0;
            voxAssistantImpact2.play();
        break;
        case 3: 
            voxAssistantImpact3.pause();
            voxAssistantImpact3.currentTime = 0;
            voxAssistantImpact3.play();
        break;
        case 4: 
            voxAssistantImpact4.pause();
            voxAssistantImpact4.currentTime = 0;
            voxAssistantImpact4.play();
        break;
        case 5: 
            voxAssistantImpact5.pause();
            voxAssistantImpact5.currentTime = 0;
            voxAssistantImpact5.play();
        break;
        case 5: 
            voxAssistantImpact6.pause();
            voxAssistantImpact6.currentTime = 0;
            voxAssistantImpact6.play();
        break;
      }
}
function voxAssistantDanger(){

    const random = rand(1,24);
    switch (random){
        case 1: 
            voxAssistantDanger1.pause();
            voxAssistantDanger1.currentTime = 0;
            voxAssistantDanger1.play();
        break;
        case 2: 
            voxAssistantDanger2.pause();
            voxAssistantDanger2.currentTime = 0;
            voxAssistantDanger2.play();
        break;
        case 3: 
            voxAssistantDanger3.pause();
            voxAssistantDanger3.currentTime = 0;
            voxAssistantDanger3.play();
        break;
        case 4: 
            voxAssistantDanger4.pause();
            voxAssistantDanger4.currentTime = 0;
            voxAssistantDanger4.play();
        break;
        case 5: 
            voxAssistantDanger5.pause();
            voxAssistantDanger5.currentTime = 0;
            voxAssistantDanger5.play();
        break;
        case 6: 
            voxAssistantDanger6.pause();
            voxAssistantDanger6.currentTime = 0;
            voxAssistantDanger6.play();
        break;
        case 7: 
            voxAssistantDanger7.pause();
            voxAssistantDanger7.currentTime = 0;
            voxAssistantDanger7.play();
        break;
      }
}
function voxAssistantRage(){

    const random = rand(1,6);
    switch (random){
        case 1: 
            voxAssistantRage1.pause();
            voxAssistantRage1.currentTime = 0;
            voxAssistantRage1.play();
        break;
        case 2: 
            voxAssistantRage2.pause();
            voxAssistantRage2.currentTime = 0;
            voxAssistantRage2.play();
        break;
        case 3: 
            voxAssistantRage3.pause();
            voxAssistantRage3.currentTime = 0;
            voxAssistantRage3.play();
        break;
        case 4: 
            voxAssistantRage4.pause();
            voxAssistantRage4.currentTime = 0;
            voxAssistantRage4.play();
        break;
        case 5: 
            voxAssistantRage5.pause();
            voxAssistantRage5.currentTime = 0;
            voxAssistantRage5.play();
        break;
      }
}
function voxAssistantRejoices(){

    const random = rand(1,6);
    switch (random){
        case 1: 
            voxAssistantRejoices1.pause();
            voxAssistantRejoices1.currentTime = 0;
            voxAssistantRejoices1.play();
        break;
        case 2: 
            voxAssistantRejoices2.pause();
            voxAssistantRejoices2.currentTime = 0;
            voxAssistantRejoices2.play();
        break;
        case 3: 
            voxAssistantRejoices3.pause();
            voxAssistantRejoices3.currentTime = 0;
            voxAssistantRejoices3.play();
        break;
        case 4: 
            voxAssistantRejoices4.pause();
            voxAssistantRejoices4.currentTime = 0;
            voxAssistantRejoices4.play();
        break;
        case 5: 
            voxAssistantRejoices5.pause();
            voxAssistantRejoices5.currentTime = 0;
            voxAssistantRejoices5.play();
        break;
      }
}
function voxAssistantFinal(numb){
  switch (numb) {
    case 1:
      voxAssistantFinal1.volume = 1; 
      voxAssistantFinal1.play();
      break;
    case 2:
      voxAssistantFinal2.volume = 0.9;
      voxAssistantFinal2.play()
      break;
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
