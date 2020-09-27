
//const VendorID = '0x054c';
//const ProductID = '0x06c3';

/*document.addEventListener('DOMContentLoaded', async () => {
    let devices = await navigator.usb.getDevices();
    console.log(devices);
    devices.forEach((device) => {
        console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
    });
});*/

console.log(typeof navigator.usb);

navigator.usb.getDevices().then((devices) => {
    console.log("Total devices: " + devices.length);
    devices.forEach(device => {
        console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
    });
});

let button = document.getElementById('request-device');
button.addEventListener('click', async () => {
    let device;
    try{
        device = await navigator.usb.requestDevice({
            filters : []
        });
        await device.configurations;
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);
    }catch(e){
        // No device was selected.
        console.log(e);
    }

    if(device !== undefined){
        // Add |device| to the UI.
    }
});