
self.addEventListener("message", function(event) {
  const centroX = event.data[0].cord.x;
  const centroY = event.data[0].cord.y;
  const raggioEsplosione = event.data[0].damageRadius;
  const damage = event.data[0].damage;
  const autonomy = event.data[0].autonomy;
  let army = event.data[1];


  let armyBuffer = army.filter((enemy)=>{
    const distanzaX = Math.abs(centroX - enemy.cord.x);
    const distanzaY = Math.abs(centroY - enemy.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);
    return distanza <= raggioEsplosione;
  });

  armyBuffer.forEach((nemico) => {
    const distanzaX = Math.abs(centroX - nemico.cord.x);
    const distanzaY = Math.abs(centroY - nemico.cord.y);
    const distanza = Math.sqrt(distanzaX * distanzaX + distanzaY * distanzaY);
    if (distanza <= raggioEsplosione) {
      if(nemico.health > 0){
        nemico.cord.y -= 10;
        const dannoInflitto = damage * (1 - distanza / raggioEsplosione);
        nemico.health -= dannoInflitto + (autonomy / 2) ;
        // console.log('colpito id', nemico.id, 'salute:', Math.trunc(nemico.health) , 'danno inflitto', Math.trunc(-dannoInflitto));
    }}
  });
      // Sovrascrivi gli enemy originali nell'array army con gli enemy modificati presenti in enemyBuffer
      armyBuffer.forEach((modifiedEnemy) => {
        const index = army.findIndex((enemy) => enemy.id === modifiedEnemy.id);
        if (index !== -1) {
          army[index] = { ...modifiedEnemy };
        }
        });

      army.forEach((enemy) => {
        animazioneMovimentoVerticale(enemy);
      }),

  self.postMessage(army);

});

function  animazioneMovimentoVerticale(enemy) {
  if(enemy.alive){
  const altezzaCampoBattaglia = 800; // Altezza del campo di battaglia
    const velocitaMovimento =  enemy.speed; // Velocità di movimento in pixel
    enemy.cord.y += enemy.speed  ;
  }
};