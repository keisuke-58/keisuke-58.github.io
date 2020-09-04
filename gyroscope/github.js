'use strict';

// ----------------------------------

// main DOM
let promise1 = new Promise(() => {
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<button id="addButton" style="display:none;">Add to home screen</button><button id="start-button">start motion</button>');
});

promise1.then(() => {
    
});

let w = window.screen.width;
console.log(w);
document.querySelector('.garden').style.width = w + 'px';
document.querySelector('.garden').style.height = w + 'px';
document.querySelector('.ball').style.top = (w * 0.45) + 'px';
document.querySelector('.ball').style.left = (w * 0.45) + 'px';

const requestDeviceOrientationPermission = () => {
    if(DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function'){
        // iOS 13+ の Safari
        // 許可を取得
        DeviceOrientationEvent.requestPermission().then((permissionState) => {
            if(permissionState === 'granted'){
                // 許可を得られた場合、devicemotionをイベントリスナーに追加
                alert('start');
                window.addEventListener('deviceorientation', (event) => {
                    // devicemotionのイベント処理
                    var ball   = document.querySelector('.ball');
                    var garden = document.querySelector('.garden');
                    var output = document.querySelector('.output');

                    var maxX = garden.clientWidth  - ball.clientWidth;
                    var maxY = garden.clientHeight - ball.clientHeight;
                        
                    var x = event.beta;  // -180 から 180 の範囲で角度を示す
                    var y = event.gamma; // -90 から 90 の範囲で角度を示す
                    var z = event.alpha; // n0 から 360 の範囲で角度を示す
                    var compass = parseInt(event.webkitCompassHeading);
                    var nsew = '';
                    if((compass >= 0 && compass <= 22) || (compass >= 338 && compass <= 360)){
                        nsew = '北';   
                    }else if(compass >= 23 && compass <= 66){
                        nsew = '北東';   
                    }else if(compass >= 67 && compass <= 112){
                        nsew = '東';   
                    }else if(compass >= 113 && compass <= 157){
                        nsew = '南東';   
                    }else if(compass >= 158 && compass <= 202){
                        nsew = '南';   
                    }else if(compass >= 202 && compass <= 247){
                        nsew = '南西';   
                    }else if(compass >= 247 && compass <= 292){
                        nsew = '西';   
                    }else if(compass >= 292 && compass <= 337){
                        nsew = '北西';   
                    }
                    var horizontal = parseInt(x) >= 0 ? parseInt(x) : parseInt(x) * -1;
                    switch(horizontal){
                        case 0:
                        case 90:
                        case 180:
                            horizontal = '水平';
                            break;
                        default:
                            horizontal = horizontal + '°';
                    }

                    output.innerHTML  = "beta : " + x + "\n";
                    output.innerHTML += "gamma: " + y + "\n";
                    output.innerHTML += "alpha: " + z + "\n";
                    output.innerHTML += "compass: " + compass + "° " + nsew + "\n";
                    output.innerHTML += "horizontal: " + horizontal + "\n";

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
}
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', requestDeviceOrientationPermission, false);


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