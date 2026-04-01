// Countdown timer functionality
const timerElements = {
  days: document.querySelector('[data-timer="days"]'),
  hours: document.querySelector('[data-timer="hours"]'),
  minutes: document.querySelector('[data-timer="minutes"]'),
  seconds: document.querySelector('[data-timer="seconds"]'),
};

const previousValues = {
  days: '14',
  hours: '00',
  minutes: '00',
  seconds: '00',
};

function getTargetDate() {
  // Launch date: 14 days from now
  const launch = new Date();
  launch.setDate(launch.getDate() + 14);
  launch.setHours(0, 0, 0, 0);
  return launch;
}

function updateTimer() {
  const now = new Date();
  const launch = getTargetDate();
  const diff = launch - now;

  if (diff <= 0) {
    // Timer finished
    Object.values(timerElements).forEach((el) => {
      el.textContent = '00';
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const newValues = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };

  // Update each timer value and add flip animation if changed
  Object.keys(timerElements).forEach((key) => {
    if (newValues[key] !== previousValues[key]) {
      timerElements[key].classList.add('flip');
      timerElements[key].textContent = newValues[key];

      // Remove animation class after it completes
      setTimeout(() => {
        timerElements[key].classList.remove('flip');
      }, 600);

      previousValues[key] = newValues[key];
    }
  });
}

// Update timer immediately and then every second
updateTimer();
setInterval(updateTimer, 1000);
