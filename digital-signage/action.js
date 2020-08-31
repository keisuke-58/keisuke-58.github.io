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