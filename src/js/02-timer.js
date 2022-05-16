import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const refs = {
  startBtn: document.querySelector("button[data-start]"),
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};

let id = null;
let selectedDate = "";

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    checkValidDate(selectedDate);
    getTimerValues();
  },
};

flatpickr("#datetime-picker", options);

function checkValidDate(date) {
  if (date < options.defaultDate) {
    Notify.failure("Please choose a date in the future", {
      timeout: 2000,
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    refs.startBtn.disabled = true;
    return;
  }

  refs.startBtn.disabled = false;
}

function getTimerValues() {
  const startTime = Date.now();
  const resultTime = selectedDate - startTime;
  const time = convertMs(resultTime);

  if (resultTime > 0) {
    updateClock(time);
  }

  if (resultTime < 1000) {
    clearInterval(id);
  }
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

refs.startBtn.addEventListener("click", () => {
  if (id) {
    return;
  }

  id = setInterval(getTimerValues, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
