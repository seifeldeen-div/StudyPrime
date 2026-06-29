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
const installBtn = document.querySelector("#installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = "block";
        // installBtn.style.animation = "fadebtn 0.8s 0.5s ease-out forwards";
    }
});

if (installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            installBtn.style.display = "none";
        }
        deferredPrompt = null;
    });
}

// Hide the button if the app is already installed
if (installBtn && window.matchMedia("(display-mode: standalone)").matches) {
    installBtn.style.display = "none";
}

// Hide the button after successful installation
window.addEventListener("appinstalled", () => {
    if (installBtn) {
        installBtn.style.display = "none";
    }

    deferredPrompt = null;
});