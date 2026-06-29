let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

let startBtn = document.querySelector(".start");
let restartBtn = document.querySelector(".restart");

let icon = document.querySelector(".start i");
let btnText = document.querySelector(".start span");

// Get saved data
let savedTime = JSON.parse(localStorage.getItem("stopwatch")) || {
    elapsedTime: 0,
    startTime: null,
    isRunning: false
};

let timer = null;

let elapsedTime = savedTime.elapsedTime;
let startTime = savedTime.startTime;
let isRunning = savedTime.isRunning;


// Update display
function update(){
    let totalSeconds;
    if(isRunning){
        totalSeconds = Math.floor(
            (Date.now() - startTime + elapsedTime) / 1000
        );
    }else{
        totalSeconds = Math.floor(elapsedTime / 1000);
    }
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    hours.innerHTML = h < 10 ? "0" + h : h;
    minutes.innerHTML = m < 10 ? "0" + m : m;
    seconds.innerHTML = s < 10 ? "0" + s : s;
}


// Save data
function saveTime(){

    localStorage.setItem("stopwatch", JSON.stringify({
        elapsedTime,
        startTime,
        isRunning
    }));

}

// Start
function start(){
    startTime = Date.now();
    isRunning = true;
    saveTime();
    timer = setInterval(()=>{
        update();
    },1000);
}

// Pause
function pause(){
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
    timer = null;
    isRunning = false;
    saveTime();
}

// Reset
function restart(){
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    startTime = null;
    isRunning = false;
    localStorage.removeItem("stopwatch");
    update();
    icon.className = "fa-solid fa-play";
    btnText.innerHTML = "Start";
}


// Toggle
function handle(){
    if(!isRunning){
        start();
        icon.className = "fa-solid fa-pause";
        btnText.innerHTML = "Pause";
    }else{
        pause();
        icon.className = "fa-solid fa-play";
        btnText.innerHTML = "Start";
    }
}

// Events
startBtn.addEventListener("click", handle);
restartBtn.addEventListener("click", restart);

if(isRunning){
    timer = setInterval(update,1000);
    icon.className = "fa-solid fa-pause";
    btnText.innerHTML = "Pause";
}

update();