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

// Geolocation
if('geolocation' in navigator){
    window.addEventListener('load', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let d = position.coords;
            let date = new Date();
            let data = {
                latitude : d.latitude,
                longitude : d.longitude,
                altitude : d.altitude,
                accuracy : d.accuracy,
                altibudeAccuracy : d.altitudeAccuracy,
                heading : d.heading,
                headingString : ((heading) => {
                    switch(heading){
                        case 0:
                            return 'north';
                            break;
                        case 90:
                            return 'east';
                            break;
                        case 180:
                            return 'south';
                            break;
                        case 270:
                            return 'west';
                            break;
                        default:
                            return 'unknown';
                            break;
                    }
                })(d.heading),
                speed : d.speed
            }
            console.log(data);
            
            let location = document.querySelector('#geolocation');
            location.value = '緯度:' + data['latitude'] + ', 経度:' + data['longitude'] + ', 高度:' + data['altitude'] + ', 方角:' + data['heading'] + ', 速度:' + data['speed'] + '\n';
        }, (error) => {
            const ERROR_MSG = [
                '原因不明のエラーが発生しました。',
                '位置情報の取得が許可されませんでした。',
                '電波状況などで位置情報が取得できませんでした。',
                'タイムアウトしました。'
            ];
            console.log(error.code);
            
            let date = new Date();
            let location = document.querySelector('#geolocation');
            location.value = 'エラー:' + ERROR_MSG[error.code] + '\n';
        }, {
            enableHighAccuracy : true,
            timeout : 8000,
            maximumAge : 10000
        });    
    });
}

// ----------------------------------

fetch('ini.json').then((response) => {
    console.log(response);
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);
}).catch((error) => {
    console.log(error);
    alert('error : ' + error);
});


// ----------------------------------

// Service Worker
if('serviceWorker' in navigator){
   window.addEventListener('load', () => {
       navigator.serviceWorker.register('sw.js').then((registration) => {
           console.log(registration.scope);
       }, (error) => {
           console.log(error);
       });
   });
}

// install button
let deferredPrompt;
let addBtn = document.querySelector('#add-button');
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