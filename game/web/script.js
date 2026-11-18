
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const resetButton = document.getElementById("reset");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Xử lý khi nhấn vào ô cờ
cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;

        checkWinner();
    });
});

// Kiểm tra thắng hoặc hòa
function checkWinner() {

    let winningCombination = null;

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningCombination = condition;
            break;
        }
    }

    if (winningCombination) {

        gameActive = false;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        statusText.textContent =
            "🎉 Người chơi " + currentPlayer + " chiến thắng!";

        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        return;
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "🤝 Trận đấu hòa!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Đến lượt người chơi " + currentPlayer;
}

// Chơi lại ván mới
function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Đến lượt người chơi X";
}

// Đặt lại toàn bộ điểm số
function resetGame() {

    scoreX = 0;
    scoreO = 0;

    scoreXText.textContent = 0;
    scoreOText.textContent = 0;

    restartGame();
}

restartButton.addEventListener("click", restartGame);
resetButton.addEventListener("click", resetGame);
