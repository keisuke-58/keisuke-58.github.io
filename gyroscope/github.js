'use strict';

// ----------------------------------

// main DOM
let promise1 = new Promise(() => {
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<button id="addButton" style="display:none;">Add to home screen</button><button id="start-button">start motion</button>');
});

let gyro = {}
promise1.then(() => {
    /*window.addEventListener('deviceorientation', (event) => {
        gyro['before'] = !gyro['after'] ? {} : gyro['after'];
        gyro['after'] = {
            absolute : event.absolute,
            alpha : event.alpha,
            beta : event.beta,
            gamma : event.gamma
        }
        document.querySelector('#beforeGamma').value = gyro['before']['gamma'] === undefined ? '-' : gyro['before']['gamma'];
        document.querySelector('#afterGamma').value = gyro['after']['gamma'];
    }, true);*/
});

const requestDeviceMotionPermission = () => {
    if(DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function'){
        // iOS 13+ の Safari
        // 許可を取得
        DeviceMotionEvent.requestPermission().then((permissionState) => {
            if(permissionState === 'granted'){
                // 許可を得られた場合、devicemotionをイベントリスナーに追加
                window.addEventListener('devicemotion', (e) => {
                    // devicemotionのイベント処理
                    //alert('x:' + e.acceleration.x + ', y:' + e.acceleration.y + ', z:' + e.acceleration.z);
                    alert(e);
                });
            }else{
                // 許可を得られなかった場合の処理
            }
        }).catch((error) => {
            // https通信でない場合などで許可を取得できなかった場合
        });
    }else{
        // 上記以外のブラウザ
    }
}
const requestDeviceOrientationPermission = () => {
    if(DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'){
        // iOS 13+ の Safari
        // 許可を取得
        DeviceOrientationEvent.requestPermission().then((permissionState) => {
            if(permissionState === 'granted'){
                // 許可を得られた場合、devicemotionをイベントリスナーに追加
                window.addEventListener('deviceorientation', (e) => {
                    // devicemotionのイベント処理
                    alert('alpha:' + e.alpha + ', beta:' + e.beta + ', gamma:' + e.gamma);
                });
            }else{
                // 許可を得られなかった場合の処理
            }
        }).catch((error) => {
            // https通信でない場合などで許可を取得できなかった場合
        });
    }else{
        // 上記以外のブラウザ
    }
}

// ボタンクリックでrequestDeviceMotionPermission実行


/*const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', (requestDeviceMotionPermission) => {
    requestDeviceOrientationPermission
}, false);*/
requestDeviceMotionPermission.then((requestDeviceOrientationPermission) => {
    
}).catch((error) => {
   alert(error); 
});

// ----------------------------------

// Service Worker
if('serviceWorker' in navigator){
   window.addEventListener('load', () => {
       navigator.serviceWorker.register('/gyroscope/sw.js').then((registration) => {
           console.log(registration.scope);
       }, (error) => {
           console.log(error);
       });
   });
}

// install button
let deferredPrompt;
let addBtn = document.querySelector('#addButton');
//addBtn.style.display = 'none';

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
const isPwa = () => (window.matchMedia('(display-mode: standalone)').matches) || (window.matchMedia('(display-mode: fullscreen)').matches) || (window.navigator.standalone) || (window.navigator.fullscreen);
//if(!isPwa()){ console.log('webapp is installed'); }

if(isPwa()){
    
}