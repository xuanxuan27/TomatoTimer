
window.onload = function () {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var infoBox = document.getElementById('todoPanel');
    // 遍歷數據
    if (todos && todos.length > 0) {
        todos.forEach(function (todo, index) {
            var div = document.createElement('div');
            div.className = 'todoBox';

            var nameDiv = document.createElement('div');
            nameDiv.textContent = todo.name;
            
            var restartButton = document.createElement('button');
            restartButton.textContent = 'Restart';
            restartButton.addEventListener('click', function() {
                // 在這裡處理重啟功能，例如將該待辦事項標記為未完成或重設進度
                // 你可以在這裡添加你的重啟邏輯
                alert('重啟功能尚未實現');
            });

            div.appendChild(nameDiv);
            div.appendChild(restartButton);

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