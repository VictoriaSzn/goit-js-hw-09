function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const ElBtnOn = document.querySelector('button[data-start]');
const ElBtnOff= document.querySelector('button[data-stop]');
const body = document.querySelector('body');

ElBtnOn.addEventListener("click", () => {

    ElBtnOn.setAttribute('disabled', true);
    
    timerId = setInterval(() => {
        body.style.backgroundColor =  getRandomHexColor();
  }, 1000);
});


ElBtnOff.addEventListener("click", () => {
    clearInterval(timerId);
    ElBtnOn.removeAttribute('disabled');
});