// PWA define SW at index (main).js
if ('serviceWorker' in navigator) {
    console.log("Service worker suported")
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((registered) => {
                console.log("Registered")
                console.log(registered.active && registered.active.state)
                registered.update();
                registered.addEventListener("updatefound", () => {
                    const newWorker = registered.installing;
                    if (!newWorker) return;
                    newWorker.addEventListener("statechange", () => {
                        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                            newWorker.postMessage({ type: "SKIP_WAITING" });
                        }
                    });
                });
            })
            .catch((error) => {
                console.log("Error Happend")
                console.log(error)
            })
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });
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

if (window.matchMedia('(display-mode: standalone)').matches) {
    installBtn.style.display = 'none';
}

window.addEventListener('appinstalled', () => {
    console.log('App installed');
    installBtn.style.display = 'none';
    deferredPrompt = null;
});