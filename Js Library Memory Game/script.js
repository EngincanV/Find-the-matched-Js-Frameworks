//select all memory-card
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    //for first click
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;
    check();
}
//do cards match? 
function check() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disabledCard() : notMatched();//ternory operator ?:
}
function disabledCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
function notMatched() {
    lockBoard = true;
    //1.5 second time delay
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1500); 
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
//shuffle card order by random number
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//foreach click to the card
cards.forEach(card => card.addEventListener('click', flipCard));
