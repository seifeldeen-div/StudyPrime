// ---------------------------To Do Table----------------------
let form = document.querySelector("#form")
let input = document.querySelector("#inputField")
let addBtn = document.querySelector("#addBtn")
let ul = document.querySelector("#table")
let icon = document.querySelector("#trashIcon")
let taskDoneBtn = document.querySelector("#taskDone")
let note = document.querySelector(".note")
let inputRangeField = document.querySelector("#inputRangeField")
let ratio = document.querySelector(".ratio")

let completedTasks = 0
let allTasks = 0

// ---------------- Local Storage ----------------
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || []
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function checkTask(allTasks) {
    if (allTasks == 0) {
        note.style.display = "block"
    } else {
        note.style.display = "none"
    }
}

function updateCountersFromStorage() {
    const tasks = getTasksFromStorage()
    allTasks = tasks.length
    completedTasks = tasks.filter(t => t.done).length
}

function updateRatioANDInputRange() {
    let progress = allTasks > 0
        ? Math.floor((completedTasks / allTasks) * 100)
        : 0

    inputRangeField.style.setProperty("--width", `${progress}%`)
    ratio.textContent = `${progress}%`

    if (progress == 100 && allTasks > 0) {
        errorBadge.textContent = "Congratulations All Tasks Done"
        errorBadge.classList.add("activeErrorBadge")

        setTimeout(() => {
            errorBadge.classList.remove("activeErrorBadge")
        }, 2000)

        setTimeout(() => {
            inputRangeField.style.setProperty("--width", "0%")
            ratio.textContent = `0%`
        }, 2000)

        // reset storage
        saveTasksToStorage([])
        completedTasks = 0
        allTasks = 0
    }
}

// ---------------- New Task ----------------
function renderTask(task) {
    let newli = document.createElement("li")
    newli.textContent = task.text
    newli.dataset.id = task.id

    newli.classList.add("clicableTask")

    setTimeout(() => {
        newli.classList.remove("clicableTask")
    }, 550)

    if (task.done) {
        newli.classList.add("done")
    }

    let newIcon = icon.cloneNode(true)
    let rightSpan = document.createElement("span")

    rightSpan.appendChild(newIcon)
    newli.appendChild(rightSpan)

    ul.appendChild(newli)

    // ---------------- Delete ----------------
    newIcon.addEventListener("click", (e) => {
        e.stopPropagation()

        let tasks = getTasksFromStorage()
        tasks = tasks.filter(t => t.id != task.id)
        saveTasksToStorage(tasks)

        newli.remove()

        updateCountersFromStorage()
        updateRatioANDInputRange()
        checkTask(allTasks)
    })

    // ---------------- Done ----------------
    newli.addEventListener("click", () => {
        let tasks = getTasksFromStorage()

        tasks = tasks.map(t => {
            if (t.id == task.id) {
                t.done = true
            }
            return t
        })

        saveTasksToStorage(tasks)

        newli.classList.add("done")

        setTimeout(() => {
            newli.classList.add("dead")
            newli.classList.remove("done")
            newli.remove()

            updateCountersFromStorage()
            updateRatioANDInputRange()
            checkTask(allTasks)
        }, 500)
    })
}

// ---------------- Load on Start ----------------
window.addEventListener("load", () => {
    let tasks = getTasksFromStorage()

    // tasks.filter(task => !task.done)
    tasks = tasks.filter(t => !t.done)
    saveTasksToStorage(tasks)

    tasks.forEach(task => renderTask(task))

    updateCountersFromStorage()
    // updateRatioANDInputRange()
    checkTask(allTasks)
})
// ---------------- Add Task ----------------
addBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (input.value.trim() == "") {
        errorBadge.textContent = "Add Your Task First"
        errorBadge.classList.add("activeErrorBadge")

        setTimeout(() => {
            errorBadge.classList.remove("activeErrorBadge")
        }, 1500)

        return
    }

    const task = {
        id: Date.now(),
        text: input.value,
        done: false
    }

    let tasks = getTasksFromStorage()
    tasks.push(task)
    saveTasksToStorage(tasks)

    renderTask(task)

    updateCountersFromStorage()
    updateRatioANDInputRange()
    checkTask(allTasks)

    form.reset()
})
