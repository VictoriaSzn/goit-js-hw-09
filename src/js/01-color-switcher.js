function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const ElBtnOn = document.querySelector('button[data-start]');
const ElBtnOff= document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId;

ElBtnOn.addEventListener("click", () => {

    ElBtnOn.setAttribute('disabled', true);
    ElBtnOff.removeAttribute('disabled');
    timerId = setInterval(() => {
        body.style.backgroundColor =  getRandomHexColor();
  }, 1000);
});

ElBtnOff.addEventListener("click", () => {
 
  ElBtnOff.setAttribute('disabled', true);
  ElBtnOn.removeAttribute('disabled');
  clearInterval(timerId);
});