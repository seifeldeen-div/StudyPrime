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
let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    btn.style.display = 'block';
});

document.querySelector('#installBtn').addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted')
            document.querySelector('#installBtn').style.display = 'none';
        deferredPrompt = null;
    });
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    document.querySelector('#installBtn').style.display = 'none';
}