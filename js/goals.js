let input = document.querySelector(".goalInput");
let addBtn = document.querySelector(".add");
let goalsArea = document.querySelector(".goalsArea");


let goalsList = JSON.parse(localStorage.getItem("goals")) || [];

// display items function
function show(){
    goalsArea.innerHTML = "";
    if(goalsList.length === 0){
        goalsArea.innerHTML = `<p class="empty" >No goals yet. Set one above!</p>`;
        return;
    }
    goalsList.forEach((goal , index) => {
        goalsArea.innerHTML += `
            <div class="goal">
                <p class="goalText ${goal.done ? "completed" : ""}" onclick="completegoal(${index})">${goal.text}</p>
                <button onclick="deleteGoal(${index})" class = "del">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
    });
}
// delete element function
function deleteGoal(index){
    goalsList.splice(index , 1);
    localStorage.setItem("goals" , JSON.stringify(goalsList));
    show();
}
// button event
addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let item = input.value.trim();
    if(item != ""){
        goalsList.push(
            {
                text:item,
                done:false
            }
        );
        localStorage.setItem("goals" , JSON.stringify(goalsList));
        input.value = "";
        show();
    }
});

// completed function
function completegoal(index){
    goalsList[index].done= !goalsList[index].done;
    localStorage.setItem("goals" , JSON.stringify(goalsList));
    show();
}

show();

