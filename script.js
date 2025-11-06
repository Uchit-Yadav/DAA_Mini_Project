// Sudoku Solver using Backtracking Algorithm
// DAA Final Project

// Sample puzzles for different difficulty levels
const puzzles = {
    easy: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    medium: [
        [0, 0, 0, 6, 0, 0, 4, 0, 0],
        [7, 0, 0, 0, 0, 3, 6, 0, 0],
        [0, 0, 0, 0, 9, 1, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 1, 8, 0, 0, 0, 3],
        [0, 0, 0, 3, 0, 6, 0, 4, 5],
        [0, 4, 0, 2, 0, 0, 0, 6, 0],
        [9, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 1, 0, 0]
    ],
    hard: [
        [0, 0, 0, 0, 0, 0, 0, 1, 2],
        [0, 0, 0, 0, 3, 5, 0, 0, 0],
        [0, 0, 0, 6, 0, 0, 0, 7, 0],
        [7, 0, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 4, 0, 0, 8, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 4, 0],
        [0, 5, 0, 0, 0, 0, 6, 0, 0]
    ]
};

// Global variables
let currentBoard = Array(9).fill(0).map(() => Array(9).fill(0));
let originalBoard = Array(9).fill(0).map(() => Array(9).fill(0));
let solvingSteps = 0;
let solvingStartTime = 0;

// Initialize the grid
function initializeGrid() {
    const grid = document.getElementById('sudokuGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.maxLength = 1;
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        
        // Add input validation
        cell.addEventListener('input', function(e) {
            const value = e.target.value;
            if (value && (isNaN(value) || value < '1' || value > '9')) {
                e.target.value = '';
            }
            updateBoard();
        });
        
        grid.appendChild(cell);
    }
}

// Update the board array from grid cells
function updateBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i * 9 + j}`);
            const value = cell.value;
            currentBoard[i][j] = value ? parseInt(value) : 0;
        }
    }
}

// Load a puzzle onto the grid
function loadPuzzle(puzzle) {
    // Reset statistics
    solvingSteps = 0;
    document.getElementById('steps').textContent = '0';
    document.getElementById('time').textContent = '0ms';
    
    // Copy puzzle to boards
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            currentBoard[i][j] = puzzle[i][j];
            originalBoard[i][j] = puzzle[i][j];
            
            const cell = document.getElementById(`cell-${i * 9 + j}`);
            cell.value = puzzle[i][j] || '';
            cell.className = 'cell';
            
            if (puzzle[i][j] !== 0) {
                cell.className = 'cell given';
                cell.disabled = true;
            } else {
                cell.disabled = false;
            }
        }
    }
}

// Check if a number is valid in a given position
function isValid(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }
    
    // Check 3x3 box
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    
    return true;
}

// Find empty cell (returns [row, col] or null)
function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

// Backtracking algorithm to solve Sudoku
function solveSudoku(board) {
    solvingSteps++;
    
    // Find empty cell
    const emptyCell = findEmptyCell(board);
    
    // If no empty cell, puzzle is solved
    if (!emptyCell) {
        return true;
    }
    
    const [row, col] = emptyCell;
    
    // Try numbers 1-9
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            // Place number
            board[row][col] = num;
            
            // Recursively try to solve
            if (solveSudoku(board)) {
                return true;
            }
            
            // Backtrack if solution not found
            board[row][col] = 0;
        }
    }
    
    // No solution found
    return false;
}

// Solve the puzzle with loading animation
async function solvePuzzleWithAnimation() {
    // Disable buttons during solving
    setButtonsDisabled(true);
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');
    
    // Copy current board
    const board = currentBoard.map(row => [...row]);
    
    // Reset statistics
    solvingSteps = 0;
    solvingStartTime = Date.now();
    document.getElementById('steps').textContent = '0';
    
    // Small delay to show loading animation
    await sleep(100);
    
    // Solve the puzzle (without step-by-step animation)
    const solved = solveSudoku(board);
    
    const solvingTime = Date.now() - solvingStartTime;
    
    if (solved) {
        // Update grid with solution
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (originalBoard[i][j] === 0) {
                    const cell = document.getElementById(`cell-${i * 9 + j}`);
                    cell.value = board[i][j];
                    cell.className = 'cell solved';
                }
            }
        }
        
        // Update current board
        currentBoard = board.map(row => [...row]);
        
        // Update final statistics
        document.getElementById('steps').textContent = solvingSteps;
        document.getElementById('time').textContent = solvingTime + 'ms';
        
        // Hide loading overlay
        loadingOverlay.classList.remove('active');
        
        alert(`Puzzle solved! 🎉\n\nSteps taken: ${solvingSteps}\nTime: ${solvingTime}ms`);
    } else {
        // Hide loading overlay
        loadingOverlay.classList.remove('active');
        
        alert('No solution exists for this puzzle! 😕');
    }
    
    // Re-enable buttons
    setButtonsDisabled(false);
}

// Helper function for animation delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Set buttons disabled/enabled
function setButtonsDisabled(disabled) {
    document.getElementById('solveBtn').disabled = disabled;
    document.getElementById('resetBtn').disabled = disabled;
    document.getElementById('clearBtn').disabled = disabled;
    document.getElementById('loadBtn').disabled = disabled;
}

// Reset to original puzzle
function resetPuzzle() {
    loadPuzzle(originalBoard);
}

// Clear all cells
function clearAll() {
    const emptyBoard = Array(9).fill(0).map(() => Array(9).fill(0));
    loadPuzzle(emptyBoard);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize grid
    initializeGrid();
    
    // Load button
    document.getElementById('loadBtn').addEventListener('click', function() {
        const difficulty = document.getElementById('difficulty').value;
        if (difficulty && puzzles[difficulty]) {
            loadPuzzle(puzzles[difficulty]);
        } else {
            alert('Please select a difficulty level!');
        }
    });
    
    // Solve button
    document.getElementById('solveBtn').addEventListener('click', function() {
        updateBoard();
        
        // Check if board has at least some numbers
        const hasNumbers = currentBoard.some(row => row.some(cell => cell !== 0));
        
        if (!hasNumbers) {
            alert('Please load a puzzle or enter some numbers first!');
            return;
        }
        
        solvePuzzleWithAnimation();
    });
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetPuzzle);
    
    // Clear button
    document.getElementById('clearBtn').addEventListener('click', clearAll);
    
    // Load easy puzzle by default
    loadPuzzle(puzzles.easy);
});