window.onload = function () {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var infoBox = document.getElementById('todoPanel');

    // 遍歷數據
    if (todos && todos.length > 0) {
        todos.forEach(function (todo, index) {
            var div = document.createElement('div');
            div.className = 'todoBox';

            var nameDiv = document.createElement('div');
            nameDiv.textContent = '名稱：' + todo.name;

            var tagDiv = document.createElement('div');
            tagDiv.textContent = '標籤：' + todo.tag;

            var tomatoDiv = document.createElement('div');
            tomatoDiv.textContent = '預設番茄鐘數：' + todo.tomato;

            var remainDiv = document.createElement('div');
            remainDiv.textContent = '剩餘番茄鐘數：' + todo.remainTomato;

            var restartButton = document.createElement('button');
            restartButton.textContent = 'Restart';
            restartButton.addEventListener('click', function () {
                // 重新啟動番茄鐘
                todo.remainTomato = todo.tomato;
                todo.isTimerRunning = false;
                updateTodoDisplay(todo, div);
            });

            var startTimerButton = document.createElement('button');
            startTimerButton.textContent = 'Start Timer';
            startTimerButton.addEventListener('click', function () {
                if (!todo.isTimerRunning) {
                    // 開始計時器
                    startTimer(todo);
                    todo.isTimerRunning = true;
                    updateTodoDisplay(todo, div);
                }
            });

            var deleteButton = document.createElement('button');
            deleteButton.textContent = '刪除';
            deleteButton.addEventListener('click', function () {
                // 在這裡處理刪除 todo 的邏輯
                deleteTodo(index);
            });

            div.appendChild(nameDiv);
            div.appendChild(tagDiv);
            div.appendChild(tomatoDiv);
            div.appendChild(remainDiv);
            div.appendChild(restartButton);
            div.appendChild(startTimerButton);
            div.appendChild(deleteButton);

            infoBox.appendChild(div);

            // 如果番茄鐘正在運行，則啟動計時器
            if (todo.isTimerRunning) {
                startTimer(todo);
            }
        });
    } else {
        var div = document.createElement('div');
        div.textContent = 'There is nothing to do.';
        div.className = 'todoBox';
        infoBox.appendChild(div);
    }

    // 清空所有 todos 的按鈕
    var clearAllButton = document.createElement('button');
    clearAllButton.textContent = '清空所有 todos';
    clearAllButton.addEventListener('click', function () {
        clearAllTodos();
    });
    infoBox.appendChild(clearAllButton);
};

function startTimer(todo) {
    clearInterval(todo.timer);
    todo.remainTomato--; // 開始倒數，減少剩餘番茄鐘數
    updateTodoDisplay(todo, div);

    todo.timer = setInterval(function () {
        if (todo.remainTomato === 0) {
            clearInterval(todo.timer);
            // 當番茄鐘倒數結束時，將 isTimerRunning 設置為 false
            todo.isTimerRunning = false;
            updateTodoDisplay(todo, div);
            addToRecord();
            resetTimer();
            alert("時間到！");
        } else {
            todo.remainTomato--;
            updateTodoDisplay(todo, div);
        }
    }, 1000);

    startButton.disabled = true;
    resetButton.disabled = false;
}

function updateTodoDisplay(todo, div) {
    var remainDiv = div.querySelector('.remain-tomato');
    remainDiv.textContent = '剩餘番茄鐘數：' + todo.remainTomato;
}


// 刪除特定 todo 的函數
function deleteTodo(index) {
    var todos = JSON.parse(localStorage.getItem('todos'));
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1); // 從陣列中刪除指定索引的 todo
        localStorage.setItem('todos', JSON.stringify(todos)); // 更新本地儲存
        window.location.reload(); // 重新載入頁面以更新顯示
    }
}

// 清空所有 todos 的函數
function clearAllTodos() {
    localStorage.removeItem('todos'); // 刪除本地儲存中的 todos
    window.location.reload(); // 重新載入頁面以更新顯示
}

/*when click add new to do button then switch to the add scene*/
function AddTodo_button() {
    window.location.href = "create_thing.html";
}



/*
<div id="todoContainer">
            <!-- dynamic add to do -->
        </div>

*/