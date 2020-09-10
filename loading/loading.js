'use strict';

// ----------------------------------

document.querySelector('#loadingButton').addEventListener('click', () => {
    fetch('loading.json').then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
        return response.json();
    }).then((json) => {
        console.log(json);
        document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="' + json['id'] + '"></div>');
    }).then(() => {
        loading(true, json);
        setTimeout(() => { loading(false, json); }, 5000);
    }).catch((error) => {
        console.log(error);
    });
});

function loading(boolean, json){
    const loading = document.querySelector(json['id']);
    if(boolean === true){
        loading.insertAdjacentHTML('beforeend', json['type']['html']);
        loading.style.display = 'block';
    }else{
        loading.style.display = 'none';
        loading.textContent = null;
    }
}