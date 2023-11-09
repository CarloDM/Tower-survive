self.addEventListener("message", function(event) {

    calcolaAngolo( event.data[0], event.data[1] , event.data[2] , event.data[3] );
    function calcolaAngolo(torrettaX, torrettaY, oggettoX, oggettoY) {
    const deltaX = oggettoX - torrettaX;
    const deltaY = torrettaY - oggettoY; // Inverti la differenza Y per il sistema di coordinate
  
    let angoloInRadianti = Math.atan2(deltaY, deltaX);
    let angoloInGradi = angoloInRadianti * (180 / Math.PI);
    // Adatta l'angolo in base al sistema di coordinate desiderato
    angoloInGradi = (450 - angoloInGradi) % 360;
    self.postMessage(angoloInGradi);
  }
});