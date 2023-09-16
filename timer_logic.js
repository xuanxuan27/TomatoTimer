<<<<<<< HEAD
// ���HTML����
=======
// 獲取HTML元素
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const tomatoNumDisplay = document.getElementById("totalTomato");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const addTomatoButton = document.getElementById("addTomato");
const minusTomatoButton = document.getElementById("minusTomato");
const timerSound = document.getElementById('timerSound');

<<<<<<< HEAD
// �]�w��l�p�ɾ��ɶ��]25�����^
let minutes = 25;/* */
=======

// 設定初始計時器時間（25分鐘）
let minutes = 25;
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
let seconds = 0;
let timer;
let recordCount = 0;

<<<<<<< HEAD
// �K�[�ƥ��ť��
=======
// 添加事件監聽器
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
addTomatoButton.addEventListener("click", addTimer);
minusTomatoButton.addEventListener("click", minusTimer);


<<<<<<< HEAD
// �b�p�ɾ������ɡA�W�[�����ƶq
=======
// 在計時器結束時，增加紀錄數量
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
function addToRecord() {
    recordCount++;
    tomatoNumDisplay.textContent = recordCount;
}

<<<<<<< HEAD
// ��s�p�ɾ����
=======
// 更新計時器顯示
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
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

<<<<<<< HEAD
// �}�l�p�ɾ�
=======
// 開始計時器
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
function startTimer() {
    /*if (customMinutesInput.value !== "") {
        minutes = parseInt(customMinutesInput.value);
    }*/
    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            addToRecord();
            resetTimer();
<<<<<<< HEAD
            playTimerSound(); // 計時器到達0，播放提示音
            alert("�ɶ���I");
=======
            alert("時間到！");
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
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

<<<<<<< HEAD
// ���m�p�ɾ�
=======
// 重置計時器
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
function resetTimer() {
    clearInterval(timer);
    minutes = 25;/* */
    seconds = 0;
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}

<<<<<<< HEAD
function playTimerSound() {
    timerSound.play();
}

// ��l�ƭp�ɾ����
=======
// 初始化計時器顯示
>>>>>>> c4fcef4869406171b7e5d4e24ca08b71a20f95e1
updateDisplay();
resetButton.disabled = true;
