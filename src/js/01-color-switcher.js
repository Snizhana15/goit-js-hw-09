const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let id = 0;
function startColor() {
  id = setInterval(
    () => (document.body.style.background = getRandomHexColor()),
    1000
  );
  startBtn.disabled = true;
}
function stopColor() {
  clearInterval(id);
  id = 0;
  startBtn.disabled = false;
}

startBtn.addEventListener("click", startColor);
stopBtn.addEventListener("click", stopColor);
