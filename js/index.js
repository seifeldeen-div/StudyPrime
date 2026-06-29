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
let deferredPrompt;
const installBtn = document.querySelector('#installBtn');
console.log(installBtn)

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    if (!deferredPrompt) {
        return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        console.log("User choice:", choice.outcome);
        if (choice.outcome === 'accepted') {
            installBtn.style.display = 'none';
        }
        deferredPrompt = null;
    });
});