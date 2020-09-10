'use strict';

// ----------------------------------

document.querySelector('#loadingButton').addEventListener('click', () => {
    fetch('loading.json').then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'loading.json error'; }
        return response.json();
    }).then((json) => {
        console.log(json);
        document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="' + json['id'] + '"></div>');
        return json;
    }).then((json) => {
        loading(true, json);
        setTimeout(() => { loading(false, json); }, 5000);
    }).catch((error) => {
        console.log(error);
    });
});

function loading(boolean, json){
    const loading = document.querySelector('#' + json['id']);
    if(boolean === true){
        loading.insertAdjacentHTML('beforeend', json['type']['html']);
    }else{
        loading.parentNode.removeChild(loading);
    }
}