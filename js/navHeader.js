let darkLightMode = document.querySelector("#darkLightMode")
let voluomMuteSound = document.querySelector("#voluomMuteSound")
let errorBadge = document.querySelector(".errorBadge")

if (darkLightMode) {
    darkLightMode.addEventListener("click", () => {
        if (darkLightMode.classList.contains("theamModeLight")) {
            darkLightMode.classList.remove("theamModeLight")
            darkLightMode.classList.add("theamModeDark")
            document.body.classList.remove("lightTheam")
            document.body.classList.add("darkTheam")
            window.localStorage.setItem("theme", "dark")
            window.localStorage.setItem("themeIcon", "theamModeDark")
        } else {
            darkLightMode.classList.remove("theamModeDark")
            darkLightMode.classList.add("theamModeLight")
            document.body.classList.remove("darkTheam")
            document.body.classList.add("lightTheam")
            window.localStorage.setItem("theme", "light")
            window.localStorage.setItem("themeIcon", "theamModeLight")
        }
    })
}

let bgAudio = document.querySelector(".bg-audio");

// ------------------ Restore Audio State ------------------
// window.addEventListener("load", async () => {
//     let savedTime = localStorage.getItem("audioTime");
//     let playState = localStorage.getItem("state");
//     if (savedTime) {
//         bgAudio.currentTime = savedTime;
//     }
//     if (playState === "true") {
//         try {
//             await bgAudio.play();
//             voluomMuteSound.classList.remove("muteMode");
//             voluomMuteSound.classList.add("soundMode");
//         } catch (err) {
//             console.log(err);
//         }
//     } else {
//         bgAudio.pause();
//         voluomMuteSound.classList.remove("soundMode");
//         voluomMuteSound.classList.add("muteMode");
//     }
// });

voluomMuteSound.addEventListener('click', () => {
    errorBadge.textContent = `Coming at next versions`
    errorBadge.classList.add("activeErrorBadge")
    window.setTimeout(() => {
        errorBadge.classList.remove("activeErrorBadge")
    }, 2000)
})

// ------------------ Sound Button ------------------
// voluomMuteSound.addEventListener('click', () => {

//     if (bgAudio.paused) {
//         bgAudio.play();
//         voluomMuteSound.classList.remove("muteMode");
//         voluomMuteSound.classList.add("soundMode");
//     } else {
//         bgAudio.pause();
//         voluomMuteSound.classList.remove("soundMode");
//         voluomMuteSound.classList.add("muteMode");
//     }

// });

// ------------------ Save State ------------------
window.addEventListener("beforeunload", () => {
    localStorage.setItem("audioTime", bgAudio.currentTime);
    localStorage.setItem("state", !bgAudio.paused);
});

// ---------------------------welcomeMessage----------------------
let welcomeMessage = document.querySelector("#welcomeMessage")
function updateWelcomeMessage(hour) {
    if (hour >= 5 && hour <= 12) {
        welcomeMessage.textContent = `Good Morning`
    } else if (hour >= 13 && hour <= 16) {
        welcomeMessage.textContent = `Good Afternon`
    } else {
        welcomeMessage.textContent = `Good Evening`
    }
}

// --------------------------Date&Time Api-------------------------------
fetch("https://timeapi.io/api/Time/current/zone?timeZone=Africa/Cairo")
    .then((res) => res.json())
    .then((data) => {
        let time = document.querySelector(".time")
        let datePara = document.querySelector(".datePara")
        function updateTime() {
            let hou = data.hour
            let mun = data.minute
            let sec = data.seconds
            const secTime = window.setInterval(() => {
                sec++
                if (sec > 59) {
                    sec = 0
                    mun++
                    if (mun > 59) {
                        mun = 0
                        hou++
                        if (hou > 23)
                            hou = 0
                    }
                }
                let hour = (hou).toString().padStart(2, "0")
                let minute = (mun).toString().padStart(2, "0")
                let seconds = (sec).toString().padStart(2, "0")
                time.textContent = `Daylight Time - ${hour}:${minute}:${seconds}`
                updateWelcomeMessage(hour)
            }, 1000)
        }
        updateTime()
        datePara.textContent = `${data.dayOfWeek} - ${data.date}`
        // console.log(data)
    })
    .catch(() => console.log(Error("Error happend")))

// ----------------------------Showing Quotes----------------------------------
const quotes = [
    "Focus on what matters.",
    "Start before you feel ready.",
    "Discipline creates freedom.",
    "One task at a time.",
    "Small progress is still progress.",
    "Don’t break the chain.",
    "Consistency beats intensity.",
    "Do it even if it's hard.",
    "You are what you repeat daily.",
    "Less talk, more action.",
    "Stay focused and never quit.",
    "Your future self will thank you.",
    "Make it happen.",
    "Work in silence, let results speak.",
    "No zero days.",
    "Push through the resistance.",
    "Get things done.",
    "Stop overthinking, start doing.",
    "Every minute counts.",
    "Stay hungry, stay focused.",
    "Build habits, not excuses.",
    "Today is your opportunity.",
    "Keep going.",
    "One more session.",
    "Beat yesterday.",
    "Focus mode: ON.",
    "Results come from consistency.",
    "Just start.",
    "Stay locked in.",
    "Don’t wait, create.",
    "Hard work pays off.",
    "No distractions allowed.",
    "Do it for your goals.",
    "Be stronger than your excuses.",
    "Keep your head down and work.",
    "One step closer.",
    "Great things take time.",
    "Stay consistent, stay winning.",
    "Win the hour, win the day.",
    "Stay dedicated.",
    "You can do hard things.",
    "Keep building.",
    "Nothing changes if nothing changes.",
    "Work first, rest later.",
    "Stay in the zone.",
    "Your goals need your focus."
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];

document.querySelector(".quote").textContent = randomQuote;

// -----------------------localStorage with Theme--------------
let currentTheme = window.localStorage.getItem("theme")
let themeIcon = window.localStorage.getItem("themeIcon")

if (currentTheme == "light") {
    document.body.classList.add("lightTheam")
} else {
    document.body.classList.add("darkTheam")
}

if (themeIcon == "theamModeLight") {
    darkLightMode.classList.add("theamModeLight")
} else {
    darkLightMode.classList.add("theamModeDark")
}

// -------------------------Nav transition ------------------------------
let linkss = document.querySelectorAll(".link")
let activeLink = localStorage.getItem("activeLink")

linkss.forEach(li => {
    li.addEventListener('click', () => {
        linkss.forEach(item => {
            item.classList.remove("navActive")
            item.querySelector("i").classList.remove("navIconActive")
        })
        li.classList.add("navActive")
        li.querySelector("i").classList.add("navIconActive")
    })
})

// ------------------------navActive localStorage----------
const links = document.querySelectorAll(".link")
const currentPage = window.location.pathname.split('/').pop()

links.forEach(link => {
    const href = link.getAttribute('href')
    const isActive = href === '#' || href.split('/').pop() === currentPage

    if (isActive) {
        link.classList.add("navActive")
        link.querySelector("i")?.classList.add("navIconActive")
    }
})
