
// ------------------------------------- in out-
import {store} from '../data/store';
// import {} from './mathFunction.js';

export {animazioneMovimentoVerticale,bulletShot,aggiornaAngoloPuntamento,manualAim,closestSoldier,rand,update};
// ------------------------------------  <-----
// let lastTime = 0;
// const intervalFrame = 1000; // Intervallo di tempo desiderato (in millisecondi)

function update() {
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTime;

  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalFrame) {
    // Logica da eseguire
    const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
    const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
    const oggettoX = store.mouse[0]; /* Coordinata X dell'oggetto nemico */
    const oggettoY = store.mouse[1];/* Coordinata Y dell'oggetto nemico */

    calcolaAngolo(torrettaX,torrettaY,oggettoX,oggettoY);
    function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
    const deltaX = oggettoX - torrettaX;
    const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate

    let angoloInRadianti = Math.atan2(deltaY, deltaX);
    let angoloInGradi = angoloInRadianti * (180 / Math.PI);

    // Adatta l'angolo in base al sistema di coordinate desiderato
    angoloInGradi = (450 - angoloInGradi) % 360;
    // console.log(angoloInGradi);
    store.tower.rotation = angoloInGradi;
  }



    // Aggiorna il tempo di riferimento all'istante attuale
    console.log('FRamE tower', currentTime, store.lastTime,'perfrmance now:', performance.now());
    store.lastTime = currentTime;
  }

  

  // Richiedi un nuovo frame di animazione
  requestAnimationFrame(BulletUpdate);
  

//     requestAnimationFrame(BulletUpdate(
//       store.bullets.find(item => item['id'] === newShot.id),
//       store.tower.rotation,
//       store.bullets.find(item => item['id'] === newShot.id).velocity
// ));
}



// // Avvia l'aggiornamento
// requestAnimationFrame(update);



// let lastTime = 0;
// const interval = 1000; // Intervallo di tempo desiderato (in millisecondi)

function BulletUpdate() {
  
  
  const currentTime = performance.now();
  const deltaTime = currentTime - store.lastTimeBullet ;
  
  
  
  
  
  // Esegui la logica solo se è trascorso l'intervallo di tempo desiderato
  if (deltaTime >= store.intervalBulletFrame) {
    // Logica da eseguire
    newshot();
    let bullet = store.bullets[store.shotCounter],
    Rotation = store.tower.rotation,
    velocity = store.bullets[store.shotCounter].velocity;
    store.shotCounter ++;
    let life = bullet.autonomy;
    let count = 0;
    let countStop = 0;
    let explose = false;
    let velocitaXY = {};
    velocitaXY = calcolaVelocitaMovimento(Rotation, velocity);
    

      // Calcola la nuova coordinata Y in base alla velocità
      bullet.cord.y += velocitaXY.y ;
      bullet.cord.x += velocitaXY.x ;
      // contatore dissipazione
      life -=  -((velocitaXY.x + velocitaXY.y)) ;
      // -------------frequenza dimezzata---------
      store.checkDivider = store.checkDivider;
      if(store.checkDivider){
        verificaCollisioneProiettile(bullet, store.army);
      }
      // ----------------------------------------
      // interruzione spostamento in caso di collisione o fine pixel massimi percorribii
      if (bullet.stop || life < 1 ||life > bullet.autonomy * 2 ){

        count ++;
        
        let explodeDalay = setTimeout(() => {
          explose = true;
          clearInterval(shot);

          countStop ++;
          // console.log('clear interval',count,countStop);
          if(count === countStop ){
            console.log('ultimo',count,countStop);
            calcolaDannoEsplosione(bullet,store.army); 
          }
        }, bullet.timeout);
      }else{
        // console.log('nessuno stop')
      }





    // Aggiorna il tempo di riferimento all'istante attuale
    store.lastTimeBullet = currentTime;
    console.log('FRamE proiettile', currentTime, store.lastTimeBullet ,'perfrmance now:', performance.now());
  }

  // Richiedi un nuovo frame di animazione
  requestAnimationFrame(update);
  
  // Avvia l'aggiornamento
  // requestAnimationFrame(update);
}

function newshot(){
  // store.shotCounter ++;
  const nshot =
  {
  id: 0,
  cord : {x:300,y:520},
  timeout: 20,
  radius: 30,
  velocity: 10,
  damage : 650,
  damageRadius: 100,
  explode: false,
  stop:false,
  autonomy: 440,
  rady: false,
  };
  nshot.id = store.shotCounter;
  store.bullets.push(nshot);
  // return nshot;

}



function  manualAim() {
  store.manualAim = !store.manualAim;
  if(store.manualAim){

    let upgradeAngle = setInterval(() => {
      if(!store.manualAim){clearInterval(upgradeAngle)};
      if(store.manualAim){
      const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
      const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
      const oggettoX = store.mouse[0]; /* Coordinata X dell'oggetto nemico */
      const oggettoY = store.mouse[1];/* Coordinata Y dell'oggetto nemico */

      calcolaAngolo(torrettaX,torrettaY,oggettoX,oggettoY);
      function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
      const deltaX = oggettoX - torrettaX;
      const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate

      let angoloInRadianti = Math.atan2(deltaY, deltaX);
      let angoloInGradi = angoloInRadianti * (180 / Math.PI);

      // Adatta l'angolo in base al sistema di coordinate desiderato
      angoloInGradi = (450 - angoloInGradi) % 360;
      // console.log(angoloInGradi);
      store.tower.rotation = angoloInGradi;
    }

    }else{clearInterval(upgradeAngle);}
    // // Aggiorna l'angolo di puntamento della torretta
  }, 1000 / 60);
}
}

function  animazioneMovimentoVerticale(enemy) {
  const altezzaCampoBattaglia = 480; // Altezza del campo di battaglia

    const velocitaMovimento = 0.70; // Velocità di movimento in pixel per frame (puoi regolare   il valore)

      let interval = setInterval(() => {
      // Calcola la nuova coordinata Y in base alla velocità
      enemy.cord.y += velocitaMovimento;
      enemy.cord.x += 0 ;
      // console.log(store.enemy.cord.y)

      // Verifica se l'oggetto nemico ha superato l'altezza del campo di battaglia
      if (enemy.health < 1) {
        console.warn('die', enemy.id)
        clearInterval(interval);
        enemy.alive= false;
        store.kills ++;
        // stopTower();
        // stopTower();
        // let soldierIsDying = setTimeout(() => {
        //   store.army = store.army.filter(item => item.id !== enemy.id);
        //   }, 500);
      }else if(enemy.cord.y > altezzaCampoBattaglia){
        clearInterval(interval);
        enemy.alive= false;
        store.dead++;
      }
    }, 1000 / 60); // Esegui l'animazione a 60 frame al secondo (puoi regolare il valore)

};

function  bulletShot(bullet, Rotation, velocity) {

  let life = bullet.autonomy;
  let count = 0;
  let countStop = 0;
  let explose = false;
  let velocitaXY = {};
  let dalay = setTimeout(() => {
      velocitaXY = calcolaVelocitaMovimento(Rotation, velocity);

      // uccide proiettile nel caso altri clearinterval non si inneschino
      const deadline = setTimeout(() => {
      clearInterval(shot);
      console.log('bullet abosolute dead line intervall')
      }, 3500);  
      
      let shot = setInterval(() => {

      // Calcola la nuova coordinata Y in base alla velocità
      bullet.cord.y += velocitaXY.y ;
      bullet.cord.x += velocitaXY.x ;
      // contatore dissipazione
      life -=  -((velocitaXY.x + velocitaXY.y)) ;
      // -------------frequenza dimezzata---------
      store.checkDivider = store.checkDivider;
      if(store.checkDivider){
        verificaCollisioneProiettile(bullet, store.army);
      }
      // ----------------------------------------
      // interruzione spostamento in caso di collisione o fine pixel massimi percorribii
      if (bullet.stop || life < 1 ||life > bullet.autonomy * 2 ){

        count ++;
        
        let explodeDalay = setTimeout(() => {
          explose = true;
          clearInterval(shot);

          countStop ++;
          // console.log('clear interval',count,countStop);
          if(count === countStop ){
            console.log('ultimo',count,countStop);
            calcolaDannoEsplosione(bullet,store.army); 
          }
        }, bullet.timeout);
      }else{
        // console.log('nessuno stop')
      }

      }, 1000 / 30); // Esegui l'animazione a 60 frame al secondo (puoi regolare il valore)
  }, 1);

};

 // Calcolo della velocità di movimento del proiettile
function calcolaVelocitaMovimento(angolo, velocita) {
  const angoloRad = (angolo - 90) * (Math.PI / 180); // Conversione in radianti

  const x = Math.cos(angoloRad) * velocita;
  const y = Math.sin(angoloRad) * velocita;

  return {
    x,
    y
  };
}

function verificaCollisioneProiettile(bullet, nemici) {
  // let nemiciColpiti = [];

  console.log('verifica collisione')

  for (const nemico of nemici)  {
    if(nemico.alive){
    let deltaX = nemico.cord.x - bullet.cord.x;
    let deltaY = nemico.cord.y - bullet.cord.y;
    let distanza = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // console.log(nemico.id, distanza,  bullet.radius );
    if (distanza <= bullet.radius) {
      // nemiciColpiti.push(nemico.id);
      console.warn('colpito bersaglio id:', nemico.id);
      bullet.stop= true;
      bullet.rady=true;
      break;
      // return true; 
    }}
  }

}

function calcolaDannoEsplosione(bullet, enemys) {
  const centroX = bullet.cord.x;
  const centroY = bullet.cord.y;
  const raggioEsplosione = bullet.damageRadius;

  enemys.forEach((nemico) => {
    const distanzaX = Math.abs(centroX - nemico.cord.x);
    const distanzaY = Math.abs(centroY - nemico.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);

    if (distanza <= raggioEsplosione) {
      if(nemico.health > 0){
      const dannoInflitto = bullet.damage * (1 - distanza / raggioEsplosione);
      nemico.health -= dannoInflitto;
      console.log('colpito id', nemico.id, parseInt(nemico.health) , 'danno inflitto', parseInt(dannoInflitto));
    }}
  });
  bullet.explode = true;
  let endExplosion = setTimeout(() => {
  bullet.explode = false;
  // delete store.bullets.shift();
  store.bullets = store.bullets.filter(item => item.id !== bullet.id);
  }, 500);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;};


  // ----------------------------AIM------------------------------------------------------------------------


  function  aggiornaAngoloPuntamento(id) {
    store.autoAim = !store.autoAim;
    // store.tower.aim = !store.tower.aim;
    if(store.autoAim){
    let indice = id;
    if(store.army.length > 0){
      let upgradeAngle = setInterval(() => {
        if(!store.autoAim){clearInterval(upgradeAngle)};
        if(!store.army[indice].alive){indice = closestSoldier(store.army)};
        if(store.autoAim){
        const torrettaX = store.tower.cord.x; /* Coordinata X della torretta */
        const torrettaY = store.tower.cord.y;  /* Coordinata Y della torretta */
        const oggettoX = store.army[indice].cord.x; /* Coordinata X dell'oggetto nemico */
        const oggettoY = store.army[indice].cord.y;/* Coordinata Y dell'oggetto nemico */
  
        calcolaAngolo(torrettaX,torrettaY,oggettoX,oggettoY);
        function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
        const deltaX = oggettoX - torrettaX;
        const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate
  
        let angoloInRadianti = Math.atan2(deltaY, deltaX);
        let angoloInGradi = angoloInRadianti * (180 / Math.PI);
  
        // Adatta l'angolo in base al sistema di coordinate desiderato
        angoloInGradi = (450 - angoloInGradi) % 360;
        // console.log(angoloInGradi);
        store.tower.rotation = angoloInGradi;
      }

      }else{clearInterval(upgradeAngle);}
      // // Aggiorna l'angolo di puntamento della torretta
    }, 1000 / 60);
  }else{console.log('esercito vuoto')};
  }
  }

  function closestSoldier(army) {
    if(army.length > 0){
    return army.reduce((maxIndex, enemy, currentIndex, arr) => {
      if (enemy.alive && (enemy.cord.y > arr[maxIndex].cord.y)) {
        return currentIndex;
      } else {
        return maxIndex;
      }
    }, 0);
  }else{console.log('array vuoto')};
  }
// ----------------------------------------------------------------------------------------------



  function stopTower(){
    store.tower.aim = !store.tower.aim;
    console.log(store.tower.aim);
  }
