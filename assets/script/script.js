let pressedElem1 = document.getElementById("press1");
let pressedElem2 = document.getElementById("press2");
let pressedElem3 = document.getElementById("press3");
let pressedElem4 = document.getElementById("press4");

function pressGreen1() {
  pressedElem1.classList.toggle("push");
}
pressedElem1.addEventListener("click", pressGreen1);

function pressGreen2() {
  pressedElem2.classList.toggle("push");
}
pressedElem2.addEventListener("click", pressGreen2);

function pressGreen3() {
  pressedElem3.classList.toggle("push");
}
pressedElem3.addEventListener("click", pressGreen3);

function pressGreen4() {
  pressedElem4.classList.toggle("push");
}
pressedElem4.addEventListener("click", pressGreen4);

const timerCurrentReference = document.querySelector(".timerCurrent");
const totalTimerReference = document.querySelector(".totalTimer");

timerCurrentReference.innerHTML = "0.00";
totalTimerReference.innerHTML = "0.30";
