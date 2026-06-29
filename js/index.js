// PWA define SW at index (main).js
if ('serviceWorker' in navigator) {
    console.log("Service worker suported")
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((registered) => {
                console.log("Registered")
                console.log(registered.active.state)
            })
            .catch((error) => {
                console.log("Error Happend")
                console.log(error)
            })
    })
}

// Installing App

// -----------------------Installing App-------------------------------
// -----------------------Installing App-------------------------------
let deferredPrompt;
const installBtn = document.querySelector('#installBtn');

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    if (!deferredPrompt) {
        console.log("No install prompt available");
        return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            installBtn.style.display = 'none';
        }
        deferredPrompt = null;
    });
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    installBtn.style.display = 'none';
}