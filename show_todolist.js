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
            remainDiv.setAttribute("class", "remain-tomato")

            // 維尼:為了使updateTodoDisplay能正常運作而加上的class
            var restartButton = document.createElement('button');
            restartButton.textContent = 'Restart';
            restartButton.addEventListener('click', function () {
                todo.remainTomato = todo.tomato;
                updateTodoDisplay(todo, div);
            });

            var chooseButton = document.createElement('button');
            chooseButton.textContent = 'Choose';
            chooseButton.addEventListener('click', function () {
                if (isTimerRunning){
                    alert("開始計時後不能選擇事項");
                }

                // 給結束一個事項還沒休息就急著想換事情的人
                else if(breakSection){
                    alert("先休息一下吧！");
                }
                // 取消選擇
                else if (div.className == "todoBoxSelected" && !isTimerRunning){
                    chooseTodo = null;
                    todoBoxDiv = null;
                    div.className = "todoBox";
                    updateTodoDisplay(todo, div);
                }
                // 沒有番茄還按開始的情況
                else if(todo.remainTomato === 0){
                    alert("此事項已完成，若需再度計時，請restart!");
                    return;

                }else{
                    console.log("還剩餘:" + todo.remainTomato);
                    chooseTodo = todo;
                    todoBoxDiv = div;
                    todosStateClean();
                    div.className = "todoBoxSelected";
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
            div.appendChild(chooseButton);
            div.appendChild(deleteButton);

            infoBox.appendChild(div);

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
    var todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (todos.length >= 3) {
        alert("已達到最大待辦事項數量，無法新增更多。");
        return;
    }
    window.location.href = "create_thing.html";
}
/**
 * 維尼:為了產生顏色差別in defaule/ selectd/ done以做的clean state
 */
function todosStateClean() {
    var todoBoxSelected = document.getElementsByClassName("todoBoxSelected"); 
    let selectedArray = Array.from(todoBoxSelected);
    console.log(selectedArray)
    if(selectedArray.length != 0){
        selectedArray.forEach(selected => {
            selected.className = "todoBox";
        });
    }
}

// 維尼:用來以分類紀錄總番茄鐘數
function addToRecordWithTag(tag) {
    switch (tag) {
        case "讀書":
            studyRecordCount++;
            studyTomatosNumDisplay.textContent = studyRecordCount;
            break;
        case "運動":
            exerciseRecordCount++;
            exerciseTomatoesNumDisplay.textContent = exerciseRecordCount;
            break;
        default:
            otherRecordCount++;
            otherTomatoesNumDisplay.textContent = otherRecordCount;
            break;
    }
}



/*
<div id="todoContainer">
            <!-- dynamic add to do -->
        </div>

*/