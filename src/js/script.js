const frontBtn = document.querySelector('.front__btn'); //Кнопка для старта
const btnReset = document.querySelector('.btn_reset'); //Кнопка лоя перезагрузки
const front = document.querySelector('.front'); // Передняя панель
const back = document.querySelector('.back'); // Задняя панель
const btnGuess = document.querySelector('.btn-guess'); //Кнопка Guess
const count = document.querySelector('.count'); // Счётчик попыток
const input = document.querySelector('.input'); // Input (Поле для ввода числа от юзера)
const helpText = document.querySelector('.help-text'); // Текст который отображается слева внизу
const guessCount = document.querySelector('.guess-count'); // Поле с количеством попыток, кторые остались
let minNumber; // Нижняя граница диапазона числа которое нужно угадать
let maxNumber; // Верхняя граница диапазона числа которое нужно угадать
let randomNumber; // Рандомное число, которое нужно угадать
const usedNumbers = []; // Массив с использоваными числами
let numberOfAttempts; // Количество попыток
const backText = document.querySelector('.back__text'); // Строка с текстом, где отображается диапазон загаданого числа
const enableHints = true; // Флаг который вкл\выкл подсказки


// Выводит подсказку в зависимости от того больше загаданное число или меньше
function displayHelpText() {
   if (enableHints) {
      if (+input.value > randomNumber) {
         helpText.innerText = 'The hidden number is less than this!'
      } else {
         helpText.innerText = 'The hidden number is bigger than this!'
      }
   }
}

// Функция для генерирования рандомного числа
function generateRandomNumber(first, second) {
   const lower = Math.ceil(Math.min(first, second));
   const upper = Math.floor(Math.max(first, second));
   const result = Math.random() * (upper - lower + 1) + lower;

   return Math.floor(result);
}

// Функция для присвоения определенного класса элементу
function addClassTo(item, clas) {
   item.classList.add(clas);
}

// Функция для удаления определенного класса у элемента
function removeClassTo(item, clas) {
   item.classList.remove(clas);
}

// Проверка на то что юзер вводит влидные данные в инпут и 
function userNumber() {
   if (input.value > maxNumber || input.value < minNumber || input.value === '') {
      alert(`Not valid number, try to put number ${minNumber} - ${maxNumber}`)
      input.value = ''
      console.log(count.textContent)
   } else {
      // decreaseGuess(count);
   }
}

// Проверяет использованные числа
function getUsedNumbers() {
   if (!usedNumbers.includes(input.value) && input.value <= maxNumber && input.value >= minNumber && input.value !== '') {
      usedNumbers.push(input.value);
      document.querySelector('.back__user-number').innerHTML = usedNumbers;
      decreaseGuess(count);
      console.log(usedNumbers);
   }
}

// Определяет условия победы и поражения
function tryNumber() {
   if (input.value === String(randomNumber)) {
      ifWin()
   } else if (count.textContent === '1') {
      ifLoose()
   }
}

// Вызывается при победе
function ifWin() {
   alert('You Win!')
   window.location.reload()
}

// Вызывается при поражении
function ifLoose() {
   alert('You lose!')
   window.location.reload()
}

// Описает какие будут присвоения на первой странице после заполения полей и нажатия на кнопку
function setOptions() {
   minNumber = +document.querySelector('.minNumber').value;
   maxNumber = +document.querySelector('.maxNumber').value;
   randomNumber = generateRandomNumber(minNumber, maxNumber);
   numberOfAttempts = +document.querySelector('.attempts').value;
   backText.innerText = `What number between (${minNumber} - ${maxNumber})`;
   count.textContent = numberOfAttempts;
}

// Функции для смены цвета
function green() {
   addClassTo(count, 'well');
   addClassTo(helpText, 'well');
   addClassTo(helpText, 'guessCount');
   removeClassTo(count, 'normal');
   removeClassTo(count, 'hard');
   removeClassTo(helpText, 'normal');
   removeClassTo(helpText, 'hard');
   removeClassTo(guessCount, 'normal');
   removeClassTo(guessCount, 'hard');
}

function yellow() {
   addClassTo(count, 'normal');
   addClassTo(helpText, 'normal');
   addClassTo(helpText, 'normal');
   addClassTo(guessCount, 'normal');
   removeClassTo(count, 'well');
   removeClassTo(count, 'hard');
   removeClassTo(helpText, 'well');
   removeClassTo(helpText, 'hard');
   removeClassTo(guessCount, 'well');
   removeClassTo(guessCount, 'hard');
}

function red() {
   removeClassTo(count, 'well');
   removeClassTo(count, 'normal');
   removeClassTo(helpText, 'well');
   removeClassTo(helpText, 'normal');
   removeClassTo(guessCount, 'well');
   removeClassTo(guessCount, 'normal');
   addClassTo(helpText, 'hard');
   addClassTo(count, 'hard');
   addClassTo(guessCount, 'hard');
}

// Открывает основную страницу
function showBackSide() {
   addClassTo(front, 'hide');
   addClassTo(back, 'show');
   removeClassTo(front, 'show');
   removeClassTo(back, 'hide');
}

function clickFrontBack() {

   // if (!frontBtn || !btnReset) {
   //    return;
   // }

   if (Boolean(document.querySelector('.minNumber').value) && Boolean(document.querySelector('.maxNumber').value) && Boolean(document.querySelector('.attempts').value)) {
      if(minNumber)
      // addClassTo(front, 'hide');
      // addClassTo(back, 'show');
      // removeClassTo(front, 'show');
      // removeClassTo(back, 'hide');
      showBackSide();
   }

   // Возвращает страницу в изначальное состояние(перезагружает)
   function startCondition() {
      window.location.reload()
   }

   btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      addClassTo(front, 'show');
      addClassTo(back, 'hide');
      removeClassTo(front, 'hide');
      removeClassTo(back, 'show');

      setTimeout(
         startCondition, 1000
      )
   });
}

function clickGuess() {
   if (!btnGuess) {
      return;
   }

   btnGuess.addEventListener("click", (e) => {
      e.preventDefault();
      changeColor();
   });
}
clickGuess();

function decreaseGuess(number) {
   if ((parseInt(number.innerText)) > 0) {
      --number.innerText;
   }
}

// Здесь описываются условия смены цвета
function changeColor() {
   switch (true) {
      case (parseInt(count.innerText) >= numberOfAttempts):
         green();
         break;

      case (parseInt(count.innerText) > 2) && (parseInt(count.innerText)) <= (Math.ceil(numberOfAttempts * 0.7)) && (parseInt(count.innerText)) >= (Math.ceil(numberOfAttempts * 0.41)):
         yellow();
         break;

      case (parseInt(count.innerText) === 1 || (parseInt(count.innerText)) <= (Math.ceil(numberOfAttempts * 0.4))):
         red();
         break;
   }
}

btnGuess.addEventListener('click', tryNumber);
btnGuess.addEventListener('click', getUsedNumbers);
btnGuess.addEventListener('click', displayHelpText);
btnGuess.addEventListener("click", userNumber);
btnGuess.addEventListener("click", tryNumber);
frontBtn.addEventListener('click', setOptions);
frontBtn.addEventListener('click', clickFrontBack)


