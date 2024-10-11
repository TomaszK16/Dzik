const timeouts = {
    easy: 3000,
    medium: 1000,
    hard: 500,
    goat: 100,
}

document.querySelectorAll(".mode").forEach((e) => 
    e.addEventListener('click', startGame)
);

function startGame(e) {
    hideMenu();

    const timeout = timeouts[e.target.id];   
    
    game(timeout);
}

function game(timeout){
    const countup = document.querySelector("#countup");
    let number = 0;
    setInterval(() => {
        number++;
        countup.innerText = number;
    },timeout)

}

function hideMenu(){
    const menu = document.querySelector("#mainMenu");
    const gameContainer = document.querySelector("#game");
    gameContainer.style.display = "flex";
    menu.style.display = "none";
}