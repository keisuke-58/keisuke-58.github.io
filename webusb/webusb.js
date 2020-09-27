
//const VendorID = '0x054c';
//const ProductID = '0x06c3';

let device;

navigator.usb.requestDevice({
    filters : []
}).then((selectedDevice) => {
    console.log(selectedDevice.productName);
    console.log(selectedDevice.manufacturerName);
}).catch((error) => {
    console.log(error);
});