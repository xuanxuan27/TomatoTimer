
/*click to store new to do list and return to the start scene*/
function getInputValue() {
    var name = document.getElementById("name-input").value;
    var tag = document.getElementById("tag-input").value;
    var tomato = document.getElementById("tomato-input").value;
    var remainTomato = tomato;
    /*document.getElementById("result").textContent = name + tag + tomato;*/

    // 檢查各項的值是否為空
    if (name.trim() === "" || tag.trim() === "" || tomato.trim() === "") {
        // 顯示警告
        alert("請填寫所有字段。");
        return;
    }
    if (name.length > 22) {
        alert("名稱長度不得超過22字元。");
        return;
    }
    // 檢查番茄鐘數是否為有效數字且大於0
    if (!isNaN(tomato) && parseInt(tomato) > 0 && parseInt(tomato) <= 99) {
        var remainTomato = tomato;
        var todos = [];
        if (localStorage.getItem('todos') !== null) {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        var newTodo = {
            name: name,
            tag: tag,
            tomato: tomato,
            remainTomato: remainTomato
        };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        window.location.href = "TomatoTimer.html";
    } else if (parseInt(tomato) <= 0) {
        // 显示警告
        alert("番茄鐘數必須是大於0且不大於100的數字。");
    }
    else {
        alert("番茄鐘數必須是小於99的數字。");
    }
}




