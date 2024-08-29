import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let selectedDate = null;
btnStart.disabled = true;

const fp = flatpickr(myInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates.length > 0){
        selectedDate = selectedDates[0];
      }
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert("Please choose a date in the future")
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
    console.dir(selectedDate);
    },
  });  

function updateClockFace({days, hours, minutes, seconds}){
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;

}


  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
    // console.log(ms)
  }

  let timerId = null;

  function startTimer() {
    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      if (deltaTime <= 0) {
        clearInterval(timerId);
        return;
      }
      updateClockFace(convertMs(deltaTime));


    }, 1000)

  }

  btnStart.addEventListener('click', () => {
    startTimer();
    btnStart.disabled = true; 
  });


  console.dir(Date.now());
  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

