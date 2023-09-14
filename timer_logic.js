// 獲取HTML元素
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const tomatoNumDisplay = document.getElementById("totalTomato");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const addTomatoButton = document.getElementById("addTomato");
const minusTomatoButton = document.getElementById("minusTomato");


// 設定初始計時器時間（25分鐘）
let minutes = 1;
let seconds = 0;
let timer;
let recordCount = 0;

// 添加事件監聽器
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
addTomatoButton.addEventListener("click", addTimer);
minusTomatoButton.addEventListener("click", minusTimer);


// 在計時器結束時，增加紀錄數量
function addToRecord() {
    recordCount++;
    tomatoNumDisplay.textContent = recordCount;
}

// 更新計時器顯示
function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function addTimer(){
    minutes += 25;
    updateDisplay();
}

function minusTimer(){
    if(minutes-25 >=0 ) minutes -= 25;
    else minutes = 0;
    updateDisplay();
}

// 開始計時器
function startTimer() {
    /*if (customMinutesInput.value !== "") {
        minutes = parseInt(customMinutesInput.value);
    }*/
    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            addToRecord();
            resetTimer();
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
    minutes = 1;
    seconds = 0;
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}

// 初始化計時器顯示
updateDisplay();
resetButton.disabled = true;
