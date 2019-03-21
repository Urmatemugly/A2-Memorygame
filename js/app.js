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
//** Winning Modal (replace alert in cardMatch function)

//** Star Rating increase/ decrease (understand scoring scale)
// >9 moves = F- (Cheater!) {take all stars}
// 10-16 moves = A+ Good work!
// 17-21 moves = B+ Nice try
// 21 moves+ = C (Atleast you tried.. ,right?)



//** Stop speedy clickers opening more than two cards (Lock board?)

// ** lockBoard(){removeEventListeners}  // lockBoard(){addEventListener}

function initiateGame(){
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
  moves.innerHTML = `${clicks}`;
  clearDeck();
  createDeck();
}
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
            console.log("No Match here!")
          }
        }
      }}
function returnCards(){
         openCards[1].classList.remove('open','show','lock');
         openCards[0].classList.remove('open','show','lock');
         openCards = [];
       }
function cardMatch(){
         openCards[1].classList.add("match");
         openCards[0].classList.add("match");
         console.log("It's a match!")
         openCards = [];
         ++matchedCards;
         if (matchedCards == 8){
           stopTimer();
           alert("Winner!");
         }
       }
function moveCount(){
         clicks = clicks + 1;
         moves.innerHTML = `${clicks}`;
         // if (`${clicks}` >= 5){
         //   alert("You've lost a star!")
         //   star.removeChild('i')
         // }
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
 const timer = document.getElementById('timer');
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  }
  // if (minutes < 10) {
  //   timer.innerHTML = `0${minutes}:0${seconds}`;
  // }
  else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }}
function stopTimer(){
 clearInterval(clockId);
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
