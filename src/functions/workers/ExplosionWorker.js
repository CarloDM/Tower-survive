
self.addEventListener("message", function(event) {
  const centroX = event.data[0].cord.x;
  const centroY = event.data[0].cord.y;
  const raggioEsplosione = event.data[0].damageRadius;
  let army = event.data[1];


  let armyBuffer = event.data[1].filter((enemy)=>{
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
      const dannoInflitto = event.data[0].damage * (1 - distanza / raggioEsplosione);
      nemico.health -= dannoInflitto;
      console.log('colpito id', nemico.id, parseInt(nemico.health) , 'danno inflitto', parseInt(dannoInflitto));
    }}
  });
      // Sovrascrivi gli enemy originali nell'array army con gli enemy modificati presenti in enemyBuffer
      armyBuffer.forEach((modifiedEnemy) => {
        const index = army.findIndex((enemy) => enemy.id === modifiedEnemy.id);
        if (index !== -1) {
          army[index] = { ...modifiedEnemy };
        }
        });

  // console.log(armyBuffer); 
  self.postMessage(army);

});