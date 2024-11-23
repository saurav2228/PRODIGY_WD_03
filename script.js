const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const resultMessage = document.getElementById("result-message");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;

  // Place mark
  if (!cell.classList.contains("taken")) {
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    // Check for win
    if (checkWin(currentPlayer)) {
      showResult(`${currentPlayer} Wins!`);
      return;
    }

    // Check for draw
    if (Array.from(cells).every(cell => cell.classList.contains("taken"))) {
      showResult("It's a Draw!");
      return;
    }

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function showResult(message) {
  winnerMessage.textContent = message;
  resultMessage.style.display = "block";
  board.style.pointerEvents = "none";
}

function restartGame() {
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  resultMessage.style.display = "none";
  board.style.pointerEvents = "auto";
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
