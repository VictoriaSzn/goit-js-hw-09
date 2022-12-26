import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {Notify} from 'notiflix';


const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minEl = document.querySelector('span[data-minutes]');
const secEl = document.querySelector('span[data-seconds]');

let userDate = null;
//btnEl.classList.add('disabled');

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if(selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            userDate = new Date();
        } else { 
            btnEl.disabled = false;
           // btnEl.classList.remove('disabled');
            userDate = selectedDates[0];
        }
  },
};

class Timer  {
  constructor() {
    this.isActive = false;
    this.timerId = null;
    btnEl.disabled = true;
  }
  start() {
     if (this.isActive) {
            return;
        }
   this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      //console.log(timeComponents);
      
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minEl.textContent = minutes;
      secEl.textContent = seconds;
      btnEl.setAttribute('disabled', true);
      if (deltaTime <= 0) {
              this.stop();
            }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    btnEl.remove('disabled');
}
};

const timer = new Timer();
    flatpickr(inputEl, options);
    btnEl.addEventListener('click', () => timer.start());


