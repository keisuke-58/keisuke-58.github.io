'use strict';

// ----------------------------------

fetch('/digital-signage/image.json').then((response) => {
    console.log(response);
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);
    let html = '<div class="swiper-container"><div class="swiper-wrapper" style="height:' + window.screen.height + 'px;">';
    if(window.screen.width < window.screen.height){
        json['swiperOptions']['direction'] = 'vertical';
    }
    let target = (json['swiperOptions']['direction'] === 'horizontal' ? 'landscape' : 'portrait');
    for(var i=0; i<json['slideImage'][target].length; i++){
        html += '<div class="swiper-slide"><img src="' + json['slideImage'][target][i] + '"></div>';
    }
    /*for(var i=0; i<json['slideImage'][target].length; i++){
        html += '<div class="swiper-slide"><iframe src="https://keisuke-58.github.io' + json['slideImage'][target][i] + '" frameborder="0"></div>';
    }*/
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
                //importScripts('/digital-signage/action.js');
            }else{
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

// ----------------------------------

// PWA script

function isPwa(){
    if(window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches){
            
    }else{
        
    }
}

const isPwa = () =>
    (window.matchMedia('(display-mode: standalone)').matches) || (window.matchMedia('(display-mode: fullscreen)').matches) || (window.navigator.standalone) || (window.navigator.fullscreen);

console.log(isPwa);
console.log(window.matchMedia('(display-mode: standalone)').matches);
console.log(window.navigator.fullscreen);
if(window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches){
    // action navigator
    window.addEventListener('load', () => {
        const ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);
        if(ua.indexOf('windows nt') !== -1){
            document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="message">「ALT + F4」で閉じる</div>');
            fadeEvent();
        }else if(ua.indexOf('mac os x') !== -1){
            document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="message">「command + Q」で閉じる</div>');
            fadeEvent();
        }
    });
    function fadeEvent(){
        document.querySelector('section').addEventListener('click', () => {
            document.querySelector('.message').classList.toggle('fade');
        });
        document.querySelector('.message').addEventListener('click', () => {
            document.querySelector('.message').classList.toggle('fade');
        });
    }
}