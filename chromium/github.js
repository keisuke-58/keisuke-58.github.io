'use strict';

// ----------------------------------

// Service Worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/chromium/sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

// install button
let deferredPrompt;
const addBtn = document.querySelector('#add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    console.log(1);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
      console.log(2);
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
// ----------------------------------