document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.querySelector('.card-container');
  const playBtn = document.querySelector('.main__play-btn');
  const playAgainBtn = document.querySelector('.main__play-again-btn');
  const timerOutput = document.querySelector('.header__container');
  const headerLink = document.querySelector('.header__link');
  const inputContainer = document.querySelector('.main__input-descr');
  const input = document.querySelector('.main__input');
  const playForm = document.querySelector('.form');
  const containerLinkToMainPage = document.querySelector('.link-container');
  let numbersOfCard;
  let openedCards;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function createCards(el) {
    const card = document.createElement('div');
    const frontCard = document.createElement('div');
    const backCard = document.createElement('div');

    cardContainer.append(card);
    card.classList.add('card');
    card.append(frontCard);
    frontCard.classList.add('front');
    card.append(backCard);
    backCard.classList.add('back');
    backCard.innerHTML = el;
    let flippedCards;

    function wrongCards(el) {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        el[0].classList.remove('flip');
        el[1].classList.remove('flip');
      }, 900);
    }

    function rightCards(el) {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        el[0].classList.add('opened');
        el[1].classList.add('opened');
        el[0].classList.remove('flip');
        el[1].classList.remove('flip');
      }, 500);
    }

    card.addEventListener('click', () => {
      card.classList.toggle('flip');
      flippedCards = document.querySelectorAll('.flip');
      if (flippedCards.length === 2 && flippedCards[0].textContent !== flippedCards[1].textContent) {
        wrongCards(flippedCards);
      } else if (flippedCards.length === 2 && flippedCards[0].textContent === flippedCards[1].textContent) {
        rightCards(flippedCards);
      }
    })
  }

  playForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const CARD_WIDTH = 100;
    if (parseInt(input.value) > 10 || parseInt(input.value) % 2 !== 0) {
      numbersOfCard = [];
      for (let i = 1; i <= 4; i++) {
        numbersOfCard.push(i);
      }
      cardContainer.style.width = `${(CARD_WIDTH * 4) + 100}px`;
    } else {
      numbersOfCard = [];
      for (let i = 1; i <= ((parseInt(input.value) ** 2) / 2); i++) {
        numbersOfCard.push(i);
      }
      if (parseInt(input.value) === 2) {
        cardContainer.style.width = `${(CARD_WIDTH * parseInt(input.value)) + 50}px`;
      } else {
        cardContainer.style.width = `${(CARD_WIDTH * parseInt(input.value)) + 100}px`;
      }
    }

    containerLinkToMainPage.classList.add('active');
    playBtn.classList.add('remove');
    inputContainer.classList.add('remove');
    cardContainer.classList.add('active');
    let reversedArr = [];
    reversedArr.push(...numbersOfCard);
    reversedArr.reverse();

    let shuffleOne = shuffle(reversedArr);

    numbersOfCard = shuffle(numbersOfCard);


    numbersOfCard.push(...shuffleOne);

    for (const number of numbersOfCard) {
      createCards(number);
    }
    headerLink.remove();
    const timeOfGame = parseInt(input.value) * 15
    timerOutput.textContent = timeOfGame;

    let intervalID;
    intervalID = setInterval(timer, 1000);

    function timer() {
      console.log(true);
      timerOutput.textContent = parseInt(timerOutput.textContent) - 1;
      if (timerOutput.textContent <= 0) {
        timerOutput.textContent = 0;
        clearInterval(intervalID);
        playAgainBtn.classList.add('active');
      }

      openedCards = document.querySelectorAll('.opened');
      if (openedCards.length === numbersOfCard.length) {
        clearInterval(intervalID);
        playAgainBtn.classList.add('active');
      }
    }
  })


  playAgainBtn.addEventListener('click', () => {
    let intervalID;
    clearInterval(intervalID);
    intervalID = setInterval(timer, 1000);
    playAgainBtn.classList.remove('active');
    let cards = document.querySelectorAll('.card');
    cards.forEach(e => e.remove());
    numbersOfCard = shuffle(numbersOfCard);
    console.log(numbersOfCard);
    for (const number of numbersOfCard) {
      createCards(number);
    }
    const timeOfGame = parseInt(input.value) * 15
    timerOutput.textContent = timeOfGame;



    function timer() {
      console.log(true);
      timerOutput.textContent = parseInt(timerOutput.textContent) - 1;
      if (timerOutput.textContent <= 0) {
        timerOutput.textContent = 0;
        clearInterval(intervalID);
        playAgainBtn.classList.add('active');
      }

      openedCards = document.querySelectorAll('.opened');
      if (openedCards.length === numbersOfCard.length) {
        clearInterval(intervalID);
        playAgainBtn.classList.add('active');
      }
    }
  })
})
