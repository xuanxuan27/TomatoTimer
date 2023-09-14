
/*click to store new to do list and return to the start scene*/
function getInputValue() {
    var name = document.getElementById("name-input").value;
    var tag = document.getElementById("tag-input").value;
    var tomato = document.getElementById("tomato-input").value;
    /*document.getElementById("result").textContent = name + tag + tomato;*/
    var todos = [];
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    var newTodo = {
        name: name,
        tag: tag,
        tomato: tomato
    };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "TomatoTimer.html";
}




