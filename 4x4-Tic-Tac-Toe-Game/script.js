// Select the element that displays the game status
const statusDisplay = document.querySelector('.game--status');

// Initial game variables
let gameActive = true; // Determines if the game is active
let currentPlayer = "X"; // Tracks the current player
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; // Tracks the state of the game

// Messages to display the game status
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the current player's turn at the start
statusDisplay.innerHTML = currentPlayerTurn();

// Define the winning conditions for the game
const winningConditions = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [3, 7, 11, 15],
    [2, 6, 10, 14],
    [1, 5, 9, 13],
    [0, 4, 8, 12],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

// Function to handle a cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Update the game state
    clickedCell.innerHTML = currentPlayer; // Display the current player's symbol
    clickedCell.classList.add(currentPlayer); // Add class for styling
}

// Function to switch the current player
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    statusDisplay.innerHTML = currentPlayerTurn(); // Update the game status display
}

// Function to validate the game result
function handleResultValidation() {
    let roundWon = false; // Tracks if a round has been won
    let winningCells = []; // Stores the cells that form the winning condition

    // Check each winning condition
    for (let i = 0; i <= 9; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        const d = gameState[winCondition[3]];

        // Continue if any cell in the win condition is empty
        if (a === '' || b === '' || c === '' || d === '')
            continue;

        // Check if all cells in the win condition are the same
        if (a === b && b === c && c === d) {
            roundWon = true;
            winningCells = winCondition; // Store the winning cells
            break;
        }
    }

    // If a round has been won
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(); // Display winning message
        highlightWinningCells(winningCells); // Highlight the winning cells
        setTimeout(handleRestartGame, 2000); // Restart the game after 2 seconds
        return;
    }

    // Check for a draw
    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); // Display draw message
        setTimeout(handleRestartGame, 2000); // Restart the game after 2 seconds
        return;
    }

    // If no win or draw, change the player
    handlePlayerChange();
}

// Function to highlight the winning cells
function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        document.querySelector(`[data-cell-index='${index}']`).classList.add('winning-cell');
    });
}

// Function to handle cell click events
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; // Get the clicked cell element
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Get the cell index

    // If the cell is already played or the game is inactive, return
    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    // Handle the cell being played and validate the result
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to restart the game
function handleRestartGame() {
    gameActive = true; // Set the game as active
    currentPlayer = "X"; // Reset the current player to X
    gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; // Reset the game state
    statusDisplay.innerHTML = currentPlayerTurn(); // Display the current player's turn
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = ""; // Clear the cell content
        cell.classList.remove("X", "O", "winning-cell"); // Remove all classes
    });
}

// Add click event listeners to all cells
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// Add click event listener to the restart button
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
