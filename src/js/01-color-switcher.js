const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]')
// const bg = btnStart.parentElement;
let timerId = null;
let inActive = false;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }



    btnStart.addEventListener('click', () => {

        timerId = setInterval(() => {
            document.body.style.background = getRandomHexColor();
       
        }, 1000)
        btnStart.disabled = true;
    })
    

    btnStop.addEventListener('click', () => {
        clearInterval(timerId);
        btnStart.disabled = false;
      })


