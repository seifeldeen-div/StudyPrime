let pomodoroMunites = document.querySelector(".pomodoroMunites");
let pomodoroSeconds = document.querySelector(".pomodoroSeconds");
let startBtn = document.querySelector("#start");
let returnBtn = document.querySelector("#return");

let mun = 25, sec = 0;
let running = false;
let pomodoroTimer = null;

const STORAGE_KEY = "pomodoro_timer";

// ------------------------ showTime ------------------------------
function showTime() {
    if (pomodoroMunites)
        pomodoroMunites.textContent = String(mun).padStart(2, "0");

    if (pomodoroSeconds)
        pomodoroSeconds.textContent = String(sec).padStart(2, "0");
}
showTime();

// ------------------------ Sounds ------------------------------
const tones = [600, 800, 1000, 1200];

function playTonesInOrder(tones) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let time = audioCtx.currentTime;
    const gap = 0.35;
    const repeatDelay = 1;

    for (let repeat = 0; repeat < 2; repeat++) {
        tones.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = "sine";
            osc.frequency.value = freq;

            const start =
                time +
                repeat * (tones.length * gap + repeatDelay) +
                index * gap;

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.linearRampToValueAtTime(0.8, start + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);

            osc.start(start);
            osc.stop(start + 0.25);
        });
    }
}

// ------------------------ localStorage ------------------------------
function saveState() {
    const data = {
        mun,
        sec,
        running,
        endTime: running ? Date.now() + (mun * 60 + sec) * 1000 : null
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadState() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!data) return;

    if (data.running && data.endTime) {
        const remaining = Math.max(
            0,
            Math.floor((data.endTime - Date.now()) / 1000)
        );

        mun = Math.floor(remaining / 60);
        sec = remaining % 60;

        running = true;
        startTimer();
    } else {
        mun = data.mun ?? 25;
        sec = data.sec ?? 0;
        running = false;
    }

    showTime();
}

// ------------------------ Timer ------------------------------
function startTimer() {
    clearInterval(pomodoroTimer);

    pomodoroTimer = setInterval(() => {
        if (mun === 0 && sec === 0) {
            clearInterval(pomodoroTimer);
            running = false;

            mun = 25;
            sec = 0;

            showTime();
            playTonesInOrder(tones);

            saveState();
            return;
        }

        if (sec === 0) {
            mun--;
            sec = 59;
        } else {
            sec--;
        }

        showTime();
        saveState();
    }, 1000);
}

// ------------------------ Start Button ------------------------------
document.querySelector(".fa-play").style.display = "inline-block";

startBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(pomodoroTimer);
        running = false;

        startBtn.textContent = "Start";
        document.querySelector(".fa-play").style.display = "inline-block";
        document.querySelector(".fa-pause").style.display = "none";

        saveState();
        return;
    }

    running = true;

    startBtn.textContent = "Pause";
    document.querySelector(".fa-play").style.display = "none";
    document.querySelector(".fa-pause").style.display = "inline-block";

    startTimer();
    saveState();
});

// ------------------------ Reset Button ------------------------------
returnBtn.addEventListener("click", () => {
    clearInterval(pomodoroTimer);

    mun = 25;
    sec = 0;
    running = false;

    localStorage.removeItem(STORAGE_KEY);

    document.querySelector(".fa-play").style.display = "inline-block";
    document.querySelector(".fa-pause").style.display = "none";
    startBtn.textContent = "Start";

    showTime();
});

// ------------------------ Init ------------------------------
loadState();