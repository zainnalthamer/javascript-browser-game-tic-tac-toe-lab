//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

const resetBtnEl = document.querySelector('#reset');

function init() {
    // VARIABLES
    let board = ['', '', '', '', '', '', '', '', '']; // state of the squares on the board
    let turn = 'X'; // whose turn it is
    let winner = false; // if anyone has won yet
    let tie = false; // if the game has ended in a tie

    // CONSTANTS
    const gridWidth = 3;
    const numberOfCells = gridWidth*gridWidth;

    const winningCombos = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];

    // CACHED ELEMENTS
    const squareEls = document.querySelectorAll('.sqr'); // the nine elements representing the squares on the page
    const messageEl = document.querySelector('#message'); // the element that displays the game's status on the page
    // console.log(squareEls);
    // console.log(messageEl);

    function render() {
        updateBoard();
        updateMessage();
    }

    function updateBoard() {
        messageEl.textContent = "It's X's turn";
        for(let i=0; i<numberOfCells; i++) {
            const cell = squareEls[i];
            cell.textContent = board[i];
            cell.addEventListener('click', handleClick);
            // board.push(cell);
        }
    }

    function updateMessage() {
        if(winner===false && tie===false) {
            messageEl.textContent = "It's "+turn+"'s turn";
        } else if(winner===false && tie===true) {
            messageEl.textContent = 'Tie game!';
        } else {
            messageEl.textContent = turn+' wins!';
        }
    }

    function placePiece(index) {
        board[index] = turn;
        // console.log(board);
    }

    function checkForWinner() {
        // go through each winning combination
        for(let i=0; i<winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];

            // checks that all 3 cells arent empty and have the same value
            if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                winner = true; // someone has won
                return; 
            }
        }
    }

    function checkForTie() {
        if(winner) {
            return;
        }

        let isFull = true;

        // loop through the board array
        for(let i=0; i<board.length; i++) {
            if(board[i]==='') { // checks to see if there are any empty cells to stop the loop
                isFull = false;
                break;
            }
        }

        tie = isFull; // set to true if board is full (no win/tie)
    }

    function switchPlayerTurn() {
        if(winner) {
            return;
        }

        // if its X's turn, change to O, else, change to X
        if(turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
    }

    function handleClick(event) {
        if(event.target.classList.contains('sqr')) {
            let target = event.target;
            let squareIndex = parseInt(target.id);

            if(board[squareIndex] === 'X' || board[squareIndex] === 'O') {
                return;
            }

            if(winner===true) {
                return;
            }

            placePiece(squareIndex);
            checkForWinner();
            checkForTie();
            switchPlayerTurn();
            render();
        }
    }

    updateBoard();
}

document.addEventListener('DOMContentLoaded', init);
resetBtnEl.addEventListener('click', init);