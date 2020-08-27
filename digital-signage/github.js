'use strict';

// ----------------------------------

fetch('/digital-signage/image.json').then((response) => {
    console.log(response);
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);
    let html = '<div class="swiper-container"><div class="swiper-wrapper"  style="height:100%;">';
    if(window.screen.width < window.screen.height){
        json['swiperOptions']['direction'] = 'vertical';
    }
    let target = (json['swiperOptions']['direction'] === 'horizontal' ? 'landscape' : 'portrait');
    for(var i=0; i<json['slideImage'][target].length; i++){
        html += '<div class="swiper-slide"><img src="' + json['slideImage'][target][i] + '"></div>';
    }
    html += '</div></div>';
    document.querySelector('#slider').insertAdjacentHTML('afterbegin', html);
    let mySwiper = new Swiper('.swiper-container', json['swiperOptions']);
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