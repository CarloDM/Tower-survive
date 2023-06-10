
// ------------------------------------- in out-
import {store} from '../data/store';
// import {} from './mathFunction.js';

export {animazioneMovimentoVerticale};
// ------------------------------------  <-----
function  animazioneMovimentoVerticale(enemy) {
  const altezzaCampoBattaglia = 600; // Altezza del campo di battaglia
  const velocitaMovimento = 0.5; // Velocità di movimento in pixel per frame (puoi regolare il valore)

    let interval = setInterval(() => {
    // Calcola la nuova coordinata Y in base alla velocità
    enemy.cord.y += velocitaMovimento;
    enemy.cord.x += 0 ;
    // console.log(store.enemy.cord.y)

    // Verifica se l'oggetto nemico ha superato l'altezza del campo di battaglia
    if (enemy.cord.y > altezzaCampoBattaglia ) {
      clearInterval(interval)
    }
  }, 1000 / 60); // Esegui l'animazione a 60 frame al secondo (puoi regolare il valore)
};
