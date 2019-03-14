const cards = ["fa-diamond", "fa-diamond",
                  "fa-paper-plane-o", "fa-paper-plane-o",
                  "fa-anchor", "fa-anchor",
                  "fa-bolt", "fa-bolt",
                  "fa-cube", "fa-cube",
                  "fa-leaf", "fa-leaf",
                  "fa-bicycle", "fa-bicycle",
                  "fa-bomb", "fa-bomb"];

let openCards = [];
let deck = document.querySelector('.deck');
let firstClick = true
//create cards via loop through cards[array]
for (let i = 0; i < cards.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.setAttribute("data",`${cards[i]}`)
    card.innerHTML = `<i class ="fa ${cards[i]}"></i>`
    deck.appendChild(card);
// add event listener to each card
    card.addEventListener('click', function(){

          let clickedCard = event.target;
          let previousCard = openCards[0];
          let lastFlipped = openCards[1];
      //check for first click
        if (firstClick) {
          firstClick = false;
          clickedCard.classList.add('open','show');
          console.log(clickedCard)
          openCards.push(clickedCard);
        }
      //condition if already one open card
        else if (!firstClick) {
          card.classList.add('open','show');
          openCards.push(clickedCard);
          console.log(openCards);
      //condition if clicked card matches previously clicked card
            if (openCards[0].innerHTML === openCards[1].innerHTML){
                openCards[1].classList.add("match");
                openCards[0].classList.add("match");
                console.log("match!")
                openCards = [];
              } else {
                openCards[1].classList.remove("open","show");
                openCards[0].classList.remove("open","show");
                openCards = [];
                console.log("No Match here!")
              }
                  }
                })};




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
