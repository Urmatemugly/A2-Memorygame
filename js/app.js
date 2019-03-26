const cards = ["fa-diamond", "fa-diamond",
                  "fa-paper-plane-o", "fa-paper-plane-o",
                  "fa-anchor", "fa-anchor",
                  "fa-bolt", "fa-bolt",
                  "fa-cube", "fa-cube",
                  "fa-leaf", "fa-leaf",
                  "fa-bicycle", "fa-bicycle",
                  "fa-bomb", "fa-bomb"];

//** Game global variables
let openCards = [];
let firstClick = true
let matchedCards = 0;
let clicks = 0;
let clockId;
let time = 0;
let starScore = 3;
let timerOn = false;

//** DOM Selector variables
let moves = document.querySelector('.moves')
const deck = document.querySelector('.deck');
const allCards = document.querySelectorAll('.card')
const restart = document.getElementsByClassName('restart')[0]
const timer = document.getElementById('timer');
const closeBtn = document.getElementById('modal_close');
const resetBtn = document.getElementById('resetBtn');
const modalTime = document.getElementById('modal_clock')
const modalStars = document.getElementById('modal_stars')
const modalMsg = document.getElementById('modal_msg')
const modalStarScore = document.getElementById('modal_starscore')
const star = document.querySelectorAll('.fa-star')
const stars = [...star]

//** (re)Start/Stop game
function initiateGame(){
      closeBtn.addEventListener('click', toggleModal);
      restart.addEventListener('click', resetGame);
      resetBtn.addEventListener('click', restartGame);
      createDeck()
    };
function createDeck(){
  //create cards via loop through cards[array]
  let  shuffleCards = shuffle(cards)
  for (let i = 0; i < shuffleCards.length; i++){
      const card = document.createElement("li");
      card.classList.add("card");
      card.setAttribute("data",`${cards[i]}`)
      card.innerHTML = `<i class ="fa ${cards[i]}"></i>`
      deck.appendChild(card);
  // add event listener to each card
      card.addEventListener('click', turnCard)
      }
}
function clearDeck(){
deck.innerHTML = "";
}
function resetGame(){
  stopTimer()
  clicks = 0;
  time = 0;
  openCards = []
  starScore = 3;
  firstClick = true;
  matchedCards = 0;
  updateTimer();
  moves.innerHTML = `${clicks}`;
  clearDeck();
  resetStars();
  createDeck();
  // toggleModal();
}
function restartGame(){
  stopTimer()
  clicks = 0;
  time = 0;
  openCards = [];
  starScore = 3;
  firstClick = true;
  matchedCards = 0;
  updateTimer();
  moves.innerHTML = `${clicks}`;
  clearDeck();
  resetStars();
  createDeck();
  toggleModal();
}
function resetStars(){
  let i;
  for (i = 0; i < stars.length; i++){
    stars[i].classList.remove('hide')
  }
}
function gameOver() {
  stopTimer();
  toggleModal();
}
//** Main logic
function turnCard(){
  let clickedCard = event.target;
  let previousCard = openCards[0];
  let lastFlipped = openCards[1];
  //check for first click & turn card:
  if (firstClick) {
    firstClick = false;
    clickedCard.classList.add('open','show', 'lock');
    openCards.push(clickedCard);
    timerOn = true;
    startTimer();
  }
  //if already one open card - do this:
  else if (!firstClick) {
    clickedCard.classList.add('open','show', 'lock');
    openCards.push(clickedCard);
  //if card matches previous - do this:
      if (openCards.length == 2) {
          if (openCards[0].innerHTML === openCards[1].innerHTML){
            cardMatch()
            moveCount()
            openCards = []
          }
      if (openCards.length > 2) {
        openCards = []
        setTimeout(returnCards, 275)
      }
          else {
  //if there is no match, return cards after delay
            moveCount()
            setTimeout(returnCards, 275)
          }
        }
      }}
function returnCards() {
         openCards[1].classList.remove('open','show', 'lock');
         openCards[0].classList.remove('open','show', 'lock');
         openCards = [];
       }
function cardMatch(){
         openCards[1].classList.add("match");
         openCards[0].classList.add("match");
         openCards = [];
         ++matchedCards;
         if (matchedCards >= 8){
           stopTimer();
           toggleModal();
         }
       }
//** Keeping Score
function hideStar(){
  if (clicks == 20){
      --starScore
      stars[0].classList.add('hide')
    }
  if (clicks == 30){
      --starScore
      stars[1].classList.add('hide')
    }
}
function moveCount() {
         clicks = clicks + 1;
         moves.innerHTML = `${clicks}`;
         hideStar()
       }
//** Add game timer
function startTimer(){
 clockId = setInterval(() => {
   time++;
   updateTimer();
 }, 1000);
 }
function updateTimer(){
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  }
  else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }}
function stopTimer(){
 clearInterval(clockId);
}
//** Winning Modal
function toggleModal() {
  const modal = document.querySelector('.modal_bg');
  modal.classList.toggle('hide');
  updateModal()
}
function updateModal(){
updateModalMsg()
updateModalTimer()
updateModalStars()
}
function updateModalTimer(){
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    modalTime.innerHTML = `In just ${minutes}:0${seconds}`;
  }
  else {
    modalTime.innerHTML = `In just ${minutes}:${seconds}`;
  }
}
function updateModalStars() {
  if (starScore == 1){
    modalStarScore.innerHTML = `${starScore} Star remaining!`
  }
  if (starScore > 1) {
    modalStarScore.innerHTML = `${starScore} Stars remaining!`
  }

}
function updateModalMsg(){
  if (starScore == 3){
    modalMsg.innerText = 'Awesome Job!'
  }
  if (starScore == 2){
    modalMsg.innerText = 'Good Effort!'
  }
  if (starScore == 1){
    modalMsg.innerText = 'Better luck next time!'
  }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//** On page load:
initiateGame();



                    // *****  FLEX GOALS ********* //
//Stop speedy clickers opening more than two cards (Lock board?)
// function lockBoard(){
//   let i;
//   for (i = 0; i < allCardsArr.length; i++){
//         allCardsArr[i].classList.add('lock')
//         console.log('locked!')
//       }
// }
// function unlockBoard(){
//   let allCardsArr = [...allCards]
//   let i;
//   for (i = 0; i < allCardsArr.length; i++){
//     allCardsArr[i].classList.remove('lock')
//   }
// }
