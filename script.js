const gameGrid = document.getElementById('gameGrid');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const newGameBtn = document.getElementById('newGameBtn');
const congratsModal = document.getElementById('congratsModal');
const finalMovesDisplay = document.getElementById('finalMoves');
const finalTimeDisplay = document.getElementById('finalTime');
const playAgainBtn = document.getElementById('playAgainBtn');

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [];
let flippedCards = [];
let moves = 0;
let matchedPairs = 0;
let gameStarted = false;
let timer;
let seconds = 0;

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = emoji;
    card.addEventListener('click', flipCard);
    return card;
}

function shuffleCards() {
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    cards = shuffledEmojis.map(createCard);
    gameGrid.innerHTML = '';
    cards.forEach(card => gameGrid.appendChild(card));
}

function flipCard() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }

    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.innerHTML === card2.innerHTML) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === emojis.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    finalMovesDisplay.textContent = moves;
    finalTimeDisplay.textContent = seconds;
    congratsModal.style.display = 'block';
}

function resetGame() {
    clearInterval(timer);
    moves = 0;
    matchedPairs = 0;
    gameStarted = false;
    seconds = 0;
    movesDisplay.textContent = '0';
    timeDisplay.textContent = '00:00';
    shuffleCards();
    congratsModal.style.display = 'none';
}

newGameBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize the game
shuffleCards();