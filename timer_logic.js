// ���HTML����
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const tomatoNumDisplay = document.getElementById("totalTomato");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const addTomatoButton = document.getElementById("addTomato");
const minusTomatoButton = document.getElementById("minusTomato");
const timerSound = document.getElementById('timerSound');

// �]�w��l�p�ɾ��ɶ��]25�����^
let minutes = 25;/* */
let seconds = 0;
let timer;
let recordCount = 0;

// �K�[�ƥ��ť��
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
addTomatoButton.addEventListener("click", addTimer);
minusTomatoButton.addEventListener("click", minusTimer);


// �b�p�ɾ������ɡA�W�[�����ƶq
function addToRecord() {
    recordCount++;
    tomatoNumDisplay.textContent = recordCount;
}

// ��s�p�ɾ����
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

// �}�l�p�ɾ�
function startTimer() {
    /*if (customMinutesInput.value !== "") {
        minutes = parseInt(customMinutesInput.value);
    }*/
    timer = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            addToRecord();
            resetTimer();
            playTimerSound(); // 計時器到達0，播放提示音
            alert("�ɶ���I");
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

// ���m�p�ɾ�
function resetTimer() {
    clearInterval(timer);
    minutes = 25;/* */
    seconds = 0;
    updateDisplay();
    startButton.disabled = false;
    resetButton.disabled = true;
}

function playTimerSound() {
    timerSound.play();
}

// ��l�ƭp�ɾ����
updateDisplay();
resetButton.disabled = true;
