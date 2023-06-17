// worker.js
self.onmessage = function(event) {
  const data = event.data;
  // Esegui le operazioni necessarie con i dati ricevuti dal main thread
  const result = doSomeWork(data);

  // Invia il risultato al main thread
  self.postMessage(result);
};

function doSomeWork(data) {
  // Esegui le operazioni necessarie
  return data * 2;
}