const cards = ["fa-diamond", "fa-diamond",
                  "fa-paper-plane-o", "fa-paper-plane-o",
                  "fa-anchor", "fa-anchor",
                  "fa-bolt", "fa-bolt",
                  "fa-cube", "fa-cube",
                  "fa-leaf", "fa-leaf",
                  "fa-bicycle", "fa-bicycle",
                  "fa-bomb", "fa-bomb"];

let openCards = [];
let firstClick = true
let matchedCards = 0;
let clicks = 0;
let clockId;
let time = 0;
let timerOn = false;
let moves = document.querySelector('.moves')
const deck = document.querySelector('.deck');
const restart = document.getElementsByClassName('restart')[0]
const star = document.getElementsByClassName('stars')
const li = star.firstElementChild
const closeBtn = document.getElementById('modal_close');
const modalTime = document.getElementById('modal_clock')
const modalStars = document.getElementById('modal_stars')
const timer = document.getElementById('timer');

//** Start game
function initiateGame(){
      closeBtn.addEventListener('click', toggleModal);
      restart.addEventListener('click', resetGame);
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
  clicks = 0;
  time = 0;
  updateTimer();
  moves.innerHTML = `${clicks}`;
  clearDeck();
  createDeck();
}
//** Main logic
function turnCard(){
  let clickedCard = event.target;
  let previousCard = openCards[0];
  let lastFlipped = openCards[1];
  //check for first click & turn card:
  if (firstClick) {
    firstClick = false;
    clickedCard.classList.add('open','show','lock');
    openCards.push(clickedCard);
    timerOn = true;
    startTimer();
  }
  //if already one open card - do this:
  else if (!firstClick) {
    clickedCard.classList.add('open','show','lock');
    openCards.push(clickedCard);
  //if card matches previous - do this:
      if (openCards.length == 2) {
          if (openCards[0].innerHTML === openCards[1].innerHTML){
            cardMatch()
            moveCount()
            openCards = []
          }
          else {
  //if there is no match, return cards after delay
            moveCount()
            setTimeout(returnCards, 275)
          }
        }
      }}
function returnCards() {
         openCards[1].classList.remove('open','show','lock');
         openCards[0].classList.remove('open','show','lock');
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
function moveCount() {
         clicks = clicks + 1;
         moves.innerHTML = `${clicks}`;
         hideStar()
       }
//** function [showStar / hideStar]
function hideStar(){
  if (moves.innerHTML == 10){
  star.removeChild(li)
  }
  else if (moves.innerHTML == 20){
  star.removeChild(li)
  }
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
//** Winning Modal (replace alert in cardMatch function)
function toggleModal() {
  const modal = document.querySelector('.modal_bg');
  modal.classList.toggle('hide');
  updateModal()
}
function updateModal(){
updateModalTimer()
// updateModalStars()
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

initiateGame();



                        //** Star Rating **//
// lose a star every 10 moves
// game over at 30 moves, or 5 minutes whichever occurs first

                    // *****  FLEX GOALS ********* //
//Stop speedy clickers opening more than two cards (Lock board?)
// ** lockBoard(){removeEventListeners}  // lockBoard(){addEventListener}
//After resetGame() winner cant be found (more than 8 matched cards)
