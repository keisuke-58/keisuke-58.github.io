'use strict';

// ----------------------------------

// main DOM
let promise1 = new Promise(() => {
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<button id="addButton" style="display:none;">Add to home screen</button><button id="start-button">start motion</button>');
});
const startButton = document.querySelector('#start-button');

promise1.then(() => {
    startButton.addEventListener('click', () => {
        var ball   = document.querySelector('.ball');
        var garden = document.querySelector('.garden');
        var output = document.querySelector('.output');

        var maxX = garden.clientWidth  - ball.clientWidth;
        var maxY = garden.clientHeight - ball.clientHeight;

        if(DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'){
            // iOS 13+ の Safari
            // 許可を取得
            DeviceOrientationEvent.requestPermission().then((permissionState) => {
                if(permissionState === 'granted'){
                    // 許可を得られた場合、devicemotionをイベントリスナーに追加
                    window.addEventListener('deviceorientation', (event) => {
                        // devicemotionのイベント処理
                        var x = event.beta;  // -180 から 180 の範囲で角度を示す
                        var y = event.gamma; // -90 から 90 の範囲で角度を示す

                        output.innerHTML  = "beta : " + x + "\n";
                        output.innerHTML += "gamma: " + y + "\n";

                        // デバイスをひっくり返したくはないため、
                        // x の値を -90 から 90 の範囲に制限する
                        if (x >  90) { x =  90};
                        if (x < -90) { x = -90};

                        // 計算を容易にするため、x および y の値の範囲を 
                        // 0 から 180 に変換する
                        x += 90;
                        y += 90;

                        // 10 は、ボールのサイズの半分である。
                        // これにより、配置場所をボールの中心に合わせる
                        ball.style.top  = (maxX*x/180 - 10) + "px";
                        ball.style.left = (maxY*y/180 - 10) + "px";
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
    });
});

/*const requestDeviceMotionPermission = () => {
    if(DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function'){
        // iOS 13+ の Safari
        // 許可を取得
        DeviceMotionEvent.requestPermission().then((permissionState) => {
            if(permissionState === 'granted'){
                // 許可を得られた場合、devicemotionをイベントリスナーに追加
                window.addEventListener('devicemotion', (e) => {
                    // devicemotionのイベント処理
                    alert('x:' + e.acceleration.x + ', y:' + e.acceleration.y + ', z:' + e.acceleration.z);
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
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', requestDeviceMotionPermission, false);
startButton.addEventListener('click', requestDeviceOrientationPermission, false);*/


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