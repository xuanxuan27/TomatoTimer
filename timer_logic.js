// 獲取HTML元素
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

// 設定初始計時器時間（25分鐘）
let minutes = 25;
let seconds = 0;
let timer;

// 更新計時器顯示
function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

// 開始計時器
function startTimer() {
    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            alert("時間到！");
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
    startButton.disabled = true;
    resetButton.disabled = false;
}

// 重置計時器
function resetTimer() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}

// 添加事件監聽器
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

// 初始化計時器顯示
updateDisplay();
resetButton.disabled = true;
