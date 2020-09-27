
//const VendorID = '0x054c';
//const ProductID = '0x06c3';

document.addEventListener('DOMContentLoaded', async () => {
  let devices = await navigator.usb.getDevices();
  devices.forEach(device => {
      navigator.usb.requestDevice({
          filters : []
      }).then((device) => {
          console.log(device);
      });
  });
});
