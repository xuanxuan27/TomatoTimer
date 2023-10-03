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
let minutes = 25;
let seconds = 0;
let setMinutes = minutes;
let setSecond = seconds;
let timer;

let restTime = 5;  // 休息時間（以分鐘為單位）
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
}

// 更新計時器顯示
function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function addTimer(){
    minutes += 25;/* */
    setMinutes += 25;
    updateDisplay();
}

function minusTimer(){
    if(minutes-25 >=0 ) {
        minutes -= 25;/* */
        setMinutes -= 25
    }else {
        minutes = 0;
        if(setMinutes < 25){
            setMinutes = 0;
        }
    }
    if(minutes==0 && seconds==0)
        startButton.disabled = true;
    updateDisplay();
}

// 開始計時器
function startTimer() {
    if (chooseTodo != null && chooseTodo.remainTomato == 0 && !breakSection){
        alert("此事項已完成，若需再度計時，請restart!");
    }
    else{
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
            /*playTimerSound();*/ // 計時器到達0，播放提示音
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
    if(isTimerRunning==false){
        if(breakSection == true){
            title.textContent = "工作時間";
            pomodoroCount++; // 增加番茄計數
            minutes = setMinutes;/* 維尼:back to original interval */
            seconds = setSecond;
            breakSection = false;
        }
        else{
            title.textContent = "休息時間";
            addToRecord();
            if (chooseTodo != null){
                chooseTodo.remainTomato--;
                updateTodoDisplay(chooseTodo, todoBoxDiv);     
                addToRecordWithTag(chooseTodo.tag);
            }
            else{
                addToRecordWithTag();
            }
            
            if (pomodoroCount === 3) {
                // 第四次休息，設置長休息時間
                minutes = longRestTime;
                seconds = setSecond;
                // seconds = longRestTime; // 測試用
                pomodoroCount = 0; // 重置番茄計數
            } else {
                // 其他情況，開始休息計時
                minutes = restTime;
                seconds = setSecond;
                // seconds = restTime; // 測試用
            }
            breakSection = true;
        }
    }
    // 計時未結束時使用者按 reset
    else{
        if(breakSection == false){
            title.textContent = "工作時間";
            minutes = setMinutes;/* 維尼:back to original interval */
            seconds = setSecond;
            breakSection = false;
        }
        else{
            title.textContent = "休息時間";
            if (pomodoroCount === 3) {
                // 第四次休息，設置長休息時間
                minutes = longRestTime;
                seconds = setSecond;
                // seconds = longRestTime; // 測試用
                pomodoroCount = 0; // 重置番茄計數
            } else {
                // 其他情況，開始休息計時
                minutes = restTime;
                seconds = setSecond;
                // seconds = restTime; // 測試用
            }
            breakSection = true;
        }
    }
    
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}


/*function playTimerSound() {
    timerSound.play();
}*/

// 蕃茄爆炸動畫
function tomatoAnimation() {
    musicPlayer.pause(); // 停止音樂播放
    isMusicPlaying = false;
    musicControlButton.textContent = '播放音樂'; // 更新音樂開關按鈕文本

    tomatoImage.src = "image/tomato_animation_2.gif";
    tomatoSound.play();
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        if (isMusicPlaying) {
            musicPlayer.pause(); // 停止音樂播放
            isMusicPlaying = false;
        }
        // 其他計時器結束的操作...
    } else {
        // 更新分和秒
        // 其他計時器運行的操作...

        // 檢查音樂播放狀態並做出相應的處理
        if (isMusicPlaying) {
            // 如果音樂正在播放，可以執行相關操作
        }
    }
}



// 初始化計時器顯示
updateDisplay();
resetButton.disabled = true;