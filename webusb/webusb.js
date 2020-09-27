
//const VendorID = '0x054c';
//const ProductID = '0x06c3';

document.addEventListener('DOMContentLoaded', async () => {
    let devices = await navigator.usb.getDevices();
    console.log(devices);
    devices.forEach((device) => {
        console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
    });
});
