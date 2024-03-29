const cells = document.querySelectorAll(".cell");
const statusGame = document.querySelector(".statusGame");
const restartButton = document.querySelector(".restartButton");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [6,4,2],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusGame.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function changePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
        statusGame.textContent = `${currentPlayer}'s turn`;
    }
    else {
        currentPlayer = "X";
        statusGame.textContent = `${currentPlayer}'s turn`;
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner() {
    let winner = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];

        const firstCell = options[condition[0]];
        const secondCell = options[condition[1]];
        const thirdCell = options[condition[2]];

        if (firstCell == "" || secondCell == "" || thirdCell == "") {
            continue;
        }

        if (firstCell == secondCell && secondCell == thirdCell) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusGame.textContent = `${currentPlayer} WON!`;
        running = false;
    }

    else if (!options.includes("")) {
        statusGame.textContent = "DRAW!";
        running = false;
    }

    else {
        changePlayer();
    }
}

function restartGame() {
    cells.forEach(cell => cell.textContent = "");
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusGame.textContent = `${currentPlayer}'s turn`;
    running = true;
}