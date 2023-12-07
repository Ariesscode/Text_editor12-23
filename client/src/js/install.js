const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';


});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show install prompt
        deferredPrompt.prompt();
    
        // await user acceptance
        const choiceResult = await deferredPrompt.userChoice;
    
        // Check if the user accepted the prompt
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
    
        deferredPrompt = null;
    
        // Hide the install button
        butInstall.style.display = 'none';
      }
    });


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    cons
});
