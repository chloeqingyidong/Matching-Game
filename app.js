const cards = document.querySelectorAll('.card');
let toggledCards = [];
let moves = 0; 
let clockOff = true;
let time = 0;
let clockId;
let matchedPairs = 0;
const totalPairs = 8;

const deck = document.querySelector('.deck');

  deck.addEventListener('click', function(event){
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
        if(clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget); 
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
    } 
 }); 

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
} 

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
} 

function checkForMatch() {
    if (toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) {
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match');            
         
            matchedPairs++;
            console.log(matchedPairs);
            toggledCards = [];
            if (matchedPairs === totalPairs) {
                win();
            }
        }else{
            setTimeout(() => {
                if (toggledCards.length >1) {

                toggledCards[0].classList.remove('open','show');
                toggledCards[1].classList.remove('open','show');
                }
                toggledCards = [];
        }, 1000);
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

// Shuffle the deck

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
} 
shuffleDeck(); 

// Add moves

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// Hide stars

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
} 
hideStar();

function checkScore() {
    if (moves === 16 || moves === 24) {
        hideStar();
    }
} 

// Clock

function startClock() { 
        clockId = setInterval(() => {
            displayTime()
        time++;
        ;      
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
     
    if(seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    }else{
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function stopClock() {
    clearInterval(clockId);
} 

// Modal

function toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hide');
} 
toggleModal(); //off


// Modal stats

function stats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time : ${clockTime}`;
    movesStat.innerHTML = `Moves : ${moves+1}`;
    starsStat.innerHTML = `Stars : ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

// Restart game
// Reset time
// Reset stars
// Reset moves
// Shuffle the deck

restartGame();
toggleModal();
document.querySelector('.restart').addEventListener('click', restartGame);

function restartGame() {
    resetClock();
    resetMoves();
    resetStars();
    shuffleDeck();
    for (let i = 0; i<cards.length; i++) {
    cards[i].classList.remove('open', 'show', 'match');
    }
}
function resetClock(){
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
} 
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
} 
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function win() {
    stopClock();
    stats();
    toggleModal();
} 

document.querySelector('.button_replay').addEventListener('click', restartGame);
document.querySelector('.button_close').addEventListener('click', toggleModal);