const cards = ["fa-diamond", "fa-diamond",
                  "fa-paper-plane-o", "fa-paper-plane-o",
                  "fa-anchor", "fa-anchor",
                  "fa-bolt", "fa-bolt",
                  "fa-cube", "fa-cube",
                  "fa-leaf", "fa-leaf",
                  "fa-bicycle", "fa-bicycle",
                  "fa-bomb", "fa-bomb"];
let  shuffleCards = shuffle(cards)

let openCards = [];
let deck = document.querySelector('.deck');
let firstClick = true

let clicks = 0;
let matchedCards = 0;
let moves = document.querySelector('.moves')
let restart = document.getElementById('restart')


function initiateGame(){
      createDeck()
      restart.addEventListener('click', resetGame)
    };
function createDeck(){
  //create cards via loop through cards[array]
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
    moveCount()
  }
  //if already one open card - do this:
  else if (!firstClick) {
    clickedCard.classList.add('open','show','lock');
    openCards.push(clickedCard);
    moveCount()
  //if card matches previous - do this:
      if (openCards.length == 2) {
          if (openCards[0].innerHTML === openCards[1].innerHTML){
            cardMatch()
            openCards = []
          }
          else {
  //if there is no match, return cards after delay
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
           alert("Winner!");
         }
       }
function moveCount(){
  ++clicks;
  moves.innerHTML = `${clicks}`
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
