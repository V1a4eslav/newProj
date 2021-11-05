// let genNumber;
// let userNumber

function generateNumber(max) {
    return genNumber = Math.floor(Math.random() * max);
}
genNumber = generateNumber(10);

function clickFrontBack() {
   const frontBtn = document.querySelector('.front__btn');
   const btnReset = document.querySelector('.btn_reset');
   if (!frontBtn || !btnReset) {
      return;
   }
   let front = document.querySelector('.front');
   let back = document.querySelector('.back');
   frontBtn.addEventListener("click", (e) => {
      e.preventDefault();
      front.classList.add('hide');
      back.classList.add('show');
      front.classList.remove('show');
      back.classList.remove('hide');
   });
   btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      front.classList.add('show');
      back.classList.add('hide');
      front.classList.remove('hide');
      back.classList.remove('show');
   });
}
clickFrontBack();

function clickGuess() {
   let btnGuess = document.querySelector('.btn-guess');
   let count = document.querySelector('.count');
   if (!btnGuess) {
      return;
   }
   // if(userNumber === genNumber)
   //       return  alert("you win");
   //  else if (userNumber !== genNumber) {
   //       decreaseGuess(number) 
   //  }
   btnGuess.addEventListener("click", (e) => {
      e.preventDefault();
      decreaseGuess(count);
      changeColor();
   });
}
clickGuess();

function decreaseGuess(number) {
   if ((parseInt(number.innerText)) > 0) {
      number.innerText--;
      if ((parseInt(number.innerText) === 0)) {
      alert("you lose")
      }
      
   }
}

function changeColor(color) {
   let count = document.querySelector('.count');
   let helpText = document.querySelector('.help-text');
   let guessCount = document.querySelector('.guess-count');
   if ((parseInt(count.innerText)) <= 10 && (parseInt(count.innerText)) >= 7) {
      count.classList.add('well');
      count.classList.remove('normal');
      count.classList.remove('hard');
      helpText.classList.add('well');
      helpText.classList.remove('normal');
      helpText.classList.remove('hard');
      guessCount.classList.add('well');
      guessCount.classList.remove('normal');
      guessCount.classList.remove('hard');
   } else if ((parseInt(count.innerText)) <= 6 && (parseInt(count.innerText)) >= 3) {
      count.classList.remove('well');
      count.classList.add('normal');
      count.classList.remove('hard');
      helpText.classList.remove('well');
      helpText.classList.add('normal');
      helpText.classList.remove('hard');
      guessCount.classList.remove('well');
      guessCount.classList.add('normal');
      guessCount.classList.remove('hard');
   } else if ((parseInt(count.innerText)) <= 2 && (parseInt(count.innerText)) >= 1) {
      count.classList.remove('well');
      count.classList.remove('normal');
      count.classList.add('hard');
      helpText.classList.remove('well');
      helpText.classList.remove('normal');
      helpText.classList.add('hard');
      guessCount.classList.remove('well');
      guessCount.classList.remove('normal');
      guessCount.classList.add('hard');
   }
}
