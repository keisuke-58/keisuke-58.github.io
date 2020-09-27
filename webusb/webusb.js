
const VendorID = '0x054c';
const ProductID = '0x06c3';
const device = await navigator.usb.requestDevice({filters : [

]});
device.configurations;
        
//await device.open()
//await device.selectConfiguration(1)
//await device.claimInterface(0)