// Get references to HTML elements
const timeDisplay = document.getElementById('timeDisplay');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Define the timer settings
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true; // Start with work time
let timer; // To store the interval ID

// Load sound notifications
const workSound = new Audio('work-start.mp3'); // Plays when work session starts
const breakSound = new Audio('break-start.mp3'); // Plays when break starts

// Format time function
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Start or stop the timer
function startTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startBtn.textContent = 'Start';
    } else {
        // Set the interval for countdown
        timer = setInterval(() => {
            if (isWorkTime) {
                workTime--;
                timeDisplay.textContent = formatTime(workTime);
                if (workTime === 0) {
                    clearInterval(timer);
                    timer = null;
                    switchToBreak();
                }
            } else {
                breakTime--;
                timeDisplay.textContent = formatTime(breakTime);
                if (breakTime === 0) {
                    clearInterval(timer);
                    timer = null;
                    switchToWork();
                }
            }
        }, 1000);
        startBtn.textContent = 'Pause';
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorkTime = true;
    workTime = 25 * 60;
    breakTime = 5 * 60;
    timeDisplay.textContent = formatTime(workTime);
    statusDisplay.textContent = 'Work';
    startBtn.textContent = 'Start';
}

// Switch to break
function switchToBreak() {
    isWorkTime = false;
    breakTime = 5 * 60; // Reset break time
    statusDisplay.textContent = 'Break';
    timeDisplay.textContent = formatTime(breakTime);
    breakSound.play(); // Play break time alert sound
}

// Switch to work
function switchToWork() {
    isWorkTime = true;
    workTime = 25 * 60; // Reset work time
    statusDisplay.textContent = 'Work';
    timeDisplay.textContent = formatTime(workTime);
    workSound.play(); // Play work session alert sound
}

// Event listeners
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
