// Questo è il file worker.js

// Gestisci il messaggio ricevuto dal thread principale
self.onmessage = function(event) {
  const messageFromMain = event.data;
  console.log('Received message from main thread:', messageFromMain);

  // Esegui qualche elaborazione o calcolo
  const result = performComputation();

  // Invia il risultato al thread principale
  self.postMessage(result);
};

function performComputation() {
  // Simuliamo un calcolo intensivo che richiede tempo
  let result = 0;
  for (let i = 0; i < 5; i++) {
    result += i;
  }

  return result;
}
// export default null;