// PWA define SW at index (main).js
if ('serviceWorker' in navigator) {
    console.log("Service worker suported")
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("./sw.js")
        .then((registered)=>{
            console.log("Registered")
            console.log(registered.active.state)
        })
        .catch((error)=> {
            console.log("Error Happend")
            console.log(error)
        })
    })
}