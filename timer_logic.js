// 獲取HTML元素
const title = document.getElementById("title");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const tomatoNumDisplay = document.getElementById("totalTomato");
const studyTomatosNumDisplay = document.getElementById("studyTomatoes");
const exerciseTomatoesNumDisplay = document.getElementById("exerciseTomatoes");
const otherTomatoesNumDisplay = document.getElementById("otherTomatoes");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const addTomatoButton = document.getElementById("addTomato");
const minusTomatoButton = document.getElementById("minusTomato");
const timerSound = document.getElementById('timerSound');
const tomatoSound = document.getElementById('tomatoSound');
const tomatoImage = document.getElementById("tomatoImage");
const musicControlButton = document.getElementById('musicControl');
const musicPlayer = new Audio('bgm.mp3');

// 設定初始計時器時間（25分鐘）
let minutes = 0;
let seconds = 5;
let setMinutes = minutes;
let setSecond = seconds;
let timer;

let restTime = 0;  // 休息時間（以分鐘為單位）
let longRestTime = 15; // 第四次休息的長休息時間（以分鐘為單位）
let pomodoroCount = 0; // 番茄數量計數

let chooseTodo = null;
let todoBoxDiv;

// records
let recordCount = 0;
let studyRecordCount = 0;
let exerciseRecordCount = 0;
let otherRecordCount = 0;

// 事件 flag
let isMusicPlaying = false; // music play on/off
musicPlayer.volume = 0.3;
let isTimerRunning = false;
let breakSection = false;
let startButtonDisabledFlag = false;


// 添加事件監聽器
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
addTomatoButton.addEventListener("click", addTimer);
minusTomatoButton.addEventListener("click", minusTimer);
musicControlButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        musicPlayer.pause(); // 停止音樂播放
        isMusicPlaying = false;
        musicControlButton.textContent = '播放音樂'; // 更新音樂開關按鈕文本
    } else {
        musicPlayer.play(); // 開始音樂播放
        musicPlayer.loop = true; // 設置音樂循環播放
        isMusicPlaying = true;
        musicControlButton.textContent = '停止音樂'; // 更新音樂開關按鈕文本
    }
});

// 在計時器結束時，增加紀錄數量
function addToRecord() {
    recordCount++;
    tomatoNumDisplay.textContent = recordCount;
    if (chooseTodo != null) {
        chooseTodo.remainTomato--;
        updateTodoDisplay(chooseTodo, todoBoxDiv);
        addToRecordWithTag(chooseTodo.tag);
    }
    else {
        addToRecordWithTag();
    }
}


// 更新計時器顯示
function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}


function addTimer() {
    if (!isTimerRunning) {
        if (breakSection) {
            minutes += 5;/* */
            setMinutes += 5;
        }
        else {
            minutes += 25;/* */
            setMinutes += 25;
        }
        startButtonDisabledFlag = false;
        startButton.disabled = false;
        updateDisplay();
    }
    else {
        alert("請勿於計時期間修改時間");
    }
}


function minusTimer() {
    if (!isTimerRunning) {
        if (breakSection) {
            if (minutes - 5 >= 0) {
                minutes -= 5;/* */
                setMinutes -= 5
            } else {
                minutes = 0;
                if (setMinutes < 5) {
                    setMinutes = 0;
                }
            }
        }
        else {
            if (minutes - 25 >= 0) {
                minutes -= 25;/* */
                setMinutes -= 25
            } else {
                minutes = 0;
                seconds = 0;
                if (setMinutes < 25) {
                    setMinutes = 0;
                }
            }

        }

        if (minutes == 0 && seconds == 0)
            startButtonDisabledFlag = true;
        updateDisplay();
    }
    else {
        alert("請勿於計時期間修改時間");
    }
}

// 開始計時器
function startTimer() {
    if (startButtonDisabledFlag == true) {
        alert("時間為 0 無法開始計時。");
    }
    else if (chooseTodo != null && chooseTodo.remainTomato == 0 && !breakSection) {
        alert("此事項已完成，若需再度計時，請restart!");
    }
    else {
        timingTimer();
    }

}


function timingTimer() {
    isTimerRunning = true;
    tomatoImage.src = "image/tomato_original.png";

    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            console.log("Interval cleaned");
            clearInterval(timer);
            isTimerRunning = false;
            resetTimer();
            tomatoAnimation();
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
    // 計時結束後的自動 reset
    if (isTimerRunning == false) {
        if (breakSection == true) {
            pomodoroCount++; // 增加番茄計數
            resetWorkTimer();
        }
        else {
            addToRecord();
            resetBreakTimer();
        }
    }
    // 計時未結束時使用者按 reset
    else {
        isTimerRunning = false;
        if (breakSection == false) {
            resetWorkTimer();
        }
        else {
            resetBreakTimer();
        }
    }

    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}


// 蕃茄爆炸動畫
function tomatoAnimation() {
    musicPlayer.pause(); // 停止音樂播放
    isMusicPlaying = false;
    musicControlButton.textContent = '播放音樂'; // 更新音樂開關按鈕文本

    tomatoImage.src = "image/tomato_animation_2.gif";
    tomatoSound.play();
}


function resetWorkTimer(){
    title.textContent = "工作時間";
    minutes = setMinutes;/* 維尼:back to original interval */
    seconds = setSecond;
    breakSection = false;
}


function resetBreakTimer(){
    title.textContent = "休息時間";
    if (pomodoroCount === 3) {
        // 第四次休息，設置長休息時間
        minutes = longRestTime;
        seconds = setSecond;
        pomodoroCount = 0; // 重置番茄計數
    } else {
        // 其他情況，開始休息計時
        minutes = restTime;
        seconds = setSecond;
    }
    breakSection = true;
}




// 初始化計時器顯示
updateDisplay();
resetButton.disabled = true;

