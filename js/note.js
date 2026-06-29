let textarea = document.getElementById("note");

textarea.value = localStorage.getItem("notes");
textarea.addEventListener("input",function(){
    localStorage.setItem("notes" , textarea.value);
})