
const publicKey = "BHolBkfpq1yliyfS8LAANVvYmH6k66AnjsMSEbCKK37yk0leLrquuluQnwd3Lm3A4ccRoZnnbl7fIHcDE-5-D1A";

function askForNotificationPerm() {
  Notification.requestPermission(function(result) {
    console.log("User choice", result);
    if (result !== "granted") {
      console.log("No notification permission granted!");
    } else {
      //
		
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
//////////////////////


