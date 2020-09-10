'use strict';

// ----------------------------------

let loadingType = fetch('select-loading.json').then((response) => {
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'loading.json error'; }
    return response.json();
}).then((json) => {
    loadingType = json;
}).catch((error) => {
    console.log(error);
});

document.querySelector('#loadingButton').addEventListener('click', () => {
    console.log(loadingType);
    fetch('loading.json').then((response) => {
        if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'loading.json error'; }
        return response.json();
    }).then((json) => {
        console.log(json);
        document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="' + json[loadingType['id']] + '"></div>');
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
    if(loading !== null){
        if(boolean === true){
            loading.insertAdjacentHTML('beforeend', json[loadingType['type']]['html']);
        }else{
            loading.parentNode.removeChild(loading);
        }
    }
}