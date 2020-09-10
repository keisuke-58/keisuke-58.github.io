fetch('loading.json').then((response) => {
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);
}).catch((error) => {
    console.log(error);
});