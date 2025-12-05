const SIZE = 4;
const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");
const bestElement = document.getElementById("best");
const statusPanel = document.getElementById("statusPanel");
const statusTitle = document.getElementById("statusTitle");
const statusText = document.getElementById("statusText");
const resetBtn = document.getElementById("resetBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

let board = [];
let score = 0;
let bestScore = Number(localStorage.getItem("best-2048")) || 0;
let hasWon = false;
let statusMode = null;

function setupBoardUI() {
    boardElement.querySelectorAll(".cell").forEach((cell) => cell.remove());
    for (let i = 0; i < SIZE * SIZE; i += 1) {
        const cell = document.createElement("div");
        cell.className = "cell";
        boardElement.insertBefore(cell, statusPanel);
    }
}

function resetState() {
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    score = 0;
    hasWon = false;
    hideStatus();
}

function updateScoreDisplay() {
    scoreElement.textContent = score;
    bestElement.textContent = bestScore;
}

function addRandomTile() {
    const emptyCells = [];
    board.forEach((row, rIdx) => {
        row.forEach((value, cIdx) => {
            if (value === 0) emptyCells.push([rIdx, cIdx]);
        });
    });
    if (!emptyCells.length) return false;
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
    return true;
}

function renderBoard() {
    const cells = boardElement.querySelectorAll(".cell");
    board.flat().forEach((value, idx) => {
        const cell = cells[idx];
        cell.textContent = value || "";
        cell.className = "cell";
        if (value) {
            const className = value > 2048 ? "cell-super" : `cell-${value}`;
            cell.classList.add(className);
        }
    });
    updateScoreDisplay();
}

function slide(row) {
    const filtered = row.filter((value) => value !== 0);
    for (let i = 0; i < filtered.length - 1; i += 1) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            score += filtered[i];
            filtered.splice(i + 1, 1);
            if (filtered[i] === 2048 && !hasWon) {
                hasWon = true;
                showStatus("Bạn đã thắng 🎉", "Thử tiếp để đạt kỷ lục mới!", "win");
            }
        }
    }
    const missing = SIZE - filtered.length;
    return filtered.concat(Array(missing).fill(0));
}

function moveLeft(currentBoard) {
    return currentBoard.map((row) => slide(row));
}

function moveRight(currentBoard) {
    return currentBoard.map((row) => slide([...row].reverse()).reverse());
}

function moveUp(currentBoard) {
    const rotated = transpose(currentBoard);
    const moved = moveLeft(rotated);
    return transpose(moved);
}

function moveDown(currentBoard) {
    const rotated = transpose(currentBoard);
    const moved = moveRight(rotated);
    return transpose(moved);
}

function transpose(matrix) {
    return matrix[0].map((_, colIdx) => matrix.map((row) => row[colIdx]));
}

function boardsEqual(a, b) {
    return a.every((row, rIdx) => row.every((value, cIdx) => value === b[rIdx][cIdx]));
}

function copyBoard(state) {
    return state.map((row) => [...row]);
}

function handleMove(direction) {
    if (statusPanel.classList.contains("active")) return;

    const previousBoard = copyBoard(board);
    switch (direction) {
        case "left":
            board = moveLeft(board);
            break;
        case "right":
            board = moveRight(board);
            break;
        case "up":
            board = moveUp(board);
            break;
        case "down":
            board = moveDown(board);
            break;
        default:
            return;
    }

    if (!boardsEqual(previousBoard, board)) {
        addRandomTile();
        bestScore = Math.max(bestScore, score);
        localStorage.setItem("best-2048", String(bestScore));
        renderBoard();
        checkGameOver();
    }
}

function hasMovesAvailable() {
    for (let r = 0; r < SIZE; r += 1) {
        for (let c = 0; c < SIZE; c += 1) {
            const value = board[r][c];
            if (value === 0) return true;
            if (c < SIZE - 1 && value === board[r][c + 1]) return true;
            if (r < SIZE - 1 && value === board[r + 1][c]) return true;
        }
    }
    return false;
}

function showStatus(title, text, mode = "lose") {
    statusMode = mode;
    statusTitle.textContent = title;
    statusText.textContent = text;
    playAgainBtn.textContent = mode === "win" ? "Chơi tiếp" : "Chơi lại";
    statusPanel.classList.add("active");
}

function hideStatus() {
    statusMode = null;
    statusPanel.classList.remove("active");
}

function checkGameOver() {
    if (!hasMovesAvailable()) {
        showStatus("Hết lượt 😢", "Không còn nước đi hợp lệ. Chơi lại nhé!", "lose");
    }
}

function initGame() {
    setupBoardUI();
    resetState();
    addRandomTile();
    addRandomTile();
    renderBoard();
}

resetBtn.addEventListener("click", initGame);
playAgainBtn.addEventListener("click", () => {
    if (statusMode === "win") {
        hideStatus();
    } else {
        initGame();
    }
});

document.addEventListener("keydown", (event) => {
    const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
    };
    if (keyMap[event.key]) {
        event.preventDefault();
        handleMove(keyMap[event.key]);
    }
});

let touchStartX = 0;
let touchStartY = 0;

boardElement.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

boardElement.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 30) return;
    if (absDx > absDy) {
        handleMove(dx > 0 ? "right" : "left");
    } else {
        handleMove(dy > 0 ? "down" : "up");
    }
});

initGame();

