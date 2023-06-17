import { createApp } from 'vue'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App.vue'

// import Worker from './functions/workers/Worker';

const worker = new Worker('./functions/workers/Worker');

worker.postMessage('Hello from main thread!');

worker.onmessage = function(event) {
  console.log('Received message from worker:', event.data);
};

createApp(App).mount('#app')
