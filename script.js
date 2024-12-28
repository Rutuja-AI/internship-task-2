// Get elements
const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

// Variables for timer
let timerInterval;
let elapsedTime = 0;
let isRunning = false;

// Format time into HH:MM:SS.ms
function formatTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
    .toString()
    .padStart(2, '0')}`;
}

// Update time display
function updateTime() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function startPauseTimer() {
  if (!isRunning) {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;

    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTime();
    }, 10);
  } else {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    clearInterval(timerInterval);
  }
}

// Reset the stopwatch
function resetTimer() {
  isRunning = false;
  elapsedTime = 0;
  clearInterval(timerInterval);
  updateTime();
  startPauseBtn.textContent = 'Start';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsContainer.innerHTML = '';
}

// Record a lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement('li');
  lapElement.textContent = lapTime;
  lapsContainer.appendChild(lapElement);
}

// Event listeners
startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize display
updateTime();
