
window.onload = function () {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var infoBox = document.getElementById('todoPanel');
    // 遍歷數據
    if (todos && todos.length > 0) {
        todos.forEach(function (todo, index) {
            var div = document.createElement('div');
            div.textContent = todo.name;
            div.className = 'todoBox';
            infoBox.appendChild(div);


        });
    } else {
        var div = document.createElement('div');
        div.textContent = 'There is nothing to do.';
        div.className = 'todoBox';
        infoBox.appendChild(div);
    }
};

/*when click add new to do button then switch to the add scene*/
function AddTodo_button() {
    window.location.href = "create_thing.html";
}



/*
<div id="todoContainer">
            <!-- dynamic add to do -->
        </div>

*/