let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function playerMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            alert(currentPlayer + ' wins!');
            resetBoard();
        } else if (checkTie()) {
            alert('It\'s a tie!');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        cells[i].innerText = board[row][col];
    }
}

function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
    }
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
            return true;
        }
    }
    // Check diagonals
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')) {
        return true;
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    renderBoard();
}