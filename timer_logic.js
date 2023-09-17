// 獲取HTML元素
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const tomatoNumDisplay = document.getElementById("totalTomato");
const workTomatosNumDisplay = document.getElementById("workTomatoes");
const breakTomatoesNumDisplay = document.getElementById("breakTomatoes");
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
let minutes = 1;
let seconds = 0;
let timer;
// records
let recordCount = 0;
let workRecordCount = 0;
let breakRecordCount = 0;
let otherRecordCount = 0;
// music play on/off
let isMusicPlaying = false;

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
    updateDisplay();
}

function minusTimer(){
    if(minutes-25 >=0 ) minutes -= 25;/* */
    else minutes = 0;
    updateDisplay();
}

// 開始計時器
function startTimer() {
    musicPlayer.play(); // 開始音樂播放
    isMusicPlaying = true;
    musicControlButton.textContent = '停止音樂'; // 更新音樂開關按鈕文本
    /*if (customMinutesInput.value !== "") {
        minutes = parseInt(customMinutesInput.value);
    }*/
    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            addToRecord();
            addToRecordWithTag("");
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
    musicPlayer.pause(); // 停止音樂播放
    isMusicPlaying = false;
    musicControlButton.textContent = '播放開關'; // 更新音樂開關按鈕文本
    clearInterval(timer);
    minutes = 25;/* */
    seconds = 0;
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}


/*function playTimerSound() {
    timerSound.play();
}*/

// 蕃茄爆炸動畫
function tomatoAnimation() {
    tomatoImage.src = "image/tomato_animation_2.gif";
    tomatoSound.play();
    /*alert("時間到！");*/
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