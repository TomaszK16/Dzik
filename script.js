const dzikButton = document.querySelector("#dzik");
const countup = document.querySelector("#countup");
const menu = document.querySelector("#mainMenu");
const gameContainer = document.querySelector("#game");
const endGame = document.querySelector("#endGame");
const currentScoreDisplay = document.querySelector("#currentScore");
const highScoreDisplay = document.querySelector("#highScore");
const tryAgainButton = document.querySelector("#tryAgain");
const returnButton = document.querySelector("#returnToMenu");

let timeout;
const timeouts = {
    easy: 3000,
    medium: 1000,
    hard: 500,
    goat: 100,
}

// event listeners

document.querySelectorAll(".mode").forEach((e) => 
    e.addEventListener('click', event => {
        timeout = timeouts[event.target.id];  
        startGame();
    })
);

tryAgainButton.addEventListener("click", startGame);
returnButton.addEventListener("click", () => display(menu));

// game

const shouldBeClicked = (number) => number % 7 === 0 || number.toString().includes('7');

function startGame() {
    display(gameContainer)
    game(timeout);
}

function setCountup(number) {
    countup .innerText = number;
    countup.style.color = 'black';
}

function game(timeout){
    let number = 1;
    let clicked = false;

    setCountup(number);

    const eventListener = dzikButton.addEventListener("click", () => {
        clicked = true
        countup.style.color = shouldBeClicked(number) ? '#2bdd66' : '#f21616';
    });

    const interval = setInterval(() => {
        if(clicked !== shouldBeClicked(number)) {
            lose(number);
            dzikButton.removeEventListener("click", eventListener);
            return clearInterval(interval);
        }

        setCountup(++number);
        clicked = false;
    }, timeout)
}

function lose(number){
    display(endGame);

    let highScore = localStorage.getItem("highScore") ?? 0;
    if(number > highScore){
        localStorage.setItem("highScore", number);
        highScore = number;
    } 

    currentScoreDisplay.innerText = number;
    highScoreDisplay.innerText = highScore;
}

// utility

function display(toBeDisplayed){
    [gameContainer, menu, endGame].forEach(e => e.style.display = "none")
    toBeDisplayed.style.display = "flex"
}