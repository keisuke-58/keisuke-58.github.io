'use strict';


// ----------------------------------

// IntersectionObserver
let boxElement;
let prevRatio = 0.0;
let increasingColor = 'rgba(40, 40, 190, ratio)';
let decreasingColor = 'rgba(190, 40, 40, ratio)';

window.addEventListener('load', (event) => {
    boxElement = document.querySelector('#box');
    createObserver();
}, false);

function createObserver(){
    let observer;
    let options = {
        root : null,
        rootMargin : '0px',
        threshold : buildThresholdList()
    }
    
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement);
}

function buildThresholdList(){
    let thresholds = [];
    let numSteps = 20;
    
    for(let i=1.0; i<=numSteps; i++){
        let ratio = i / numSteps;
        thresholds.push(ratio);
    }
    
    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer){
    entries.forEach((entry) => {
        if(entry.intersectionRatio > prevRatio){
            entry.target.style.backgroundColor = increasingColor.replace('ratio', entry.intersectionRatio);
        }else{
            entry.target.style.backgroundColor = decreasingColor.replace('ratio', entry.intersectionRatio);
        }
        
        prevRatio = entry.intersectionRatio;
    });
}

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
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
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