
const VendorID = '0x054c';
const ProductID = '0x06c3';

navigator.usb.requestDevice({
    filters : []
}).then((device) => {
    console.log(device.productName);
    console.log(device.manufacturerName);
}).catch((error) => {
    console.log(error);
});