'use strict';

// ----------------------------------

fetch('/digital-signage/image.json').then((response) => {
    console.log(response);
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);
    
    let promise = new Promise(() => {
        let html = '<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide"><img src="degital-signage-sample.jpg"></div><div class="swiper-slide"><img src="degital-signage-sample.jpg"></div></div></div>';
        document.querySelector('#slider').insertAdjacentHTML('afterbegin', html);
    }).then(() => {
    let mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        //direction : (function(){
            //if(window.screen.width > window.screen.height){
                //return 'horizontal';
            //}else{
                //return 'vertical';
            //}
        //}),
        direction : 'horizontal',
        loop : true, 
        speed : 10000,
        effect : 'slide',
        
        autoplay: {
            delay: 10000,
        },
    });
    });
}).catch((error) => {
    console.log(error);
    alert('error : ' + error);
});

// ----------------------------------

// Service Worker
if('serviceWorker' in navigator){
   window.addEventListener('load', () => {
       navigator.serviceWorker.register('/digital-signage/sw.js').then((registration) => {
           console.log(registration.scope);
       }, (error) => {
           console.log(error);
       });
   });
}

// install button
let deferredPrompt;
let addBtn = document.querySelector('#addButton');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
    
    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        console.log('click');
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if(choiceResult.outcome === 'accepted'){
              console.log('User accepted the A2HS prompt');
            }else{
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

// ----------------------------------