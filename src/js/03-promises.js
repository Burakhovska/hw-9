import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const delayField = document.querySelector('input[name="delay"]');
const stepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

 
form.addEventListener('submit', onStart);

  function onStart(event) {
    event.preventDefault();

    const delay = Number(delayField.value);
    const step = Number(stepField.value);
    const amount = Number(amountField.value);

    for(let i = 0; i< amount; i+=1){

    const position = i +1;
    const currentDelay = delay + step * i;

    createPromise(position, currentDelay)
    .then((value) => {
      Notiflix.Notify.success(value);
    })
    .catch((error) => {
      Notiflix.Notify.failure(error);
    });

  }  
}  

  function createPromise(position, delay) {
    
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
  
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`)
        }
      }, delay)
      })
    }
  

  
