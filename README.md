# 🧩 Sudoku Solver - Backtracking Algorithm

A beginner-friendly web application that solves Sudoku puzzles using the **backtracking algorithm**. Built with HTML, CSS, and JavaScript.

## 📋 Project Overview

This project demonstrates the use of backtracking algorithms to solve Sudoku puzzles of varying difficulty levels. It's part of the Design and Analysis of Algorithms (DAA) Final Project.

## ✨ Features

- **Backtracking Algorithm**: Implements a recursive backtracking approach to solve Sudoku puzzles
- **Multiple Difficulty Levels**: Pre-loaded puzzles ranging from Easy to Expert
- **Interactive Grid**: Manual input capability for custom puzzles
- **Visual Feedback**: Animated solving process with color-coded cells
- **Performance Statistics**: Tracks solving steps and time taken
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 How to Run

1. Clone or download this project
2. Open `index.html` in any modern web browser
3. No installation or dependencies required!

## 🎮 How to Use

1. **Load a Puzzle**:
   - Select a difficulty level (Easy, Medium, or Hard)
   - Click "Load" button

2. **Manual Entry**:
   - Click on any empty cell
   - Enter numbers 1-9

3. **Solve the Puzzle**:
   - Click "Solve Puzzle" to see the algorithm in action
   - Watch as the solution appears with animation

4. **Reset/Clear**:
   - "Reset" - Restore the original puzzle
   - "Clear All" - Start with an empty grid

## 🧠 Algorithm Explanation

### Backtracking Algorithm

The solver uses a **recursive backtracking** approach:

1. Find an empty cell in the grid
2. Try placing numbers 1-9 in that cell
3. For each number, check if it's valid according to Sudoku rules:
   - Not present in the same row
   - Not present in the same column
   - Not present in the same 3×3 box
4. If valid, place the number and recursively solve the rest
5. If a solution is found, return true
6. If no valid number works, backtrack and try a different number
7. Repeat until the puzzle is solved or proven unsolvable

### Time Complexity
- **Worst Case**: O(9^(n*n)) where n=9 for standard Sudoku
- In practice, the algorithm is much faster due to constraint propagation

### Space Complexity
- O(n*n) for storing the board
- O(n*n) for recursion stack in worst case

## 📁 Project Structure

```
DAA Final Project/
│
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Backtracking algorithm and logic
└── README.md       # This file
```

## 🎨 Features Breakdown

### HTML (`index.html`)
- Semantic structure
- 9×9 Sudoku grid
- Control buttons
- Instructions and information sections

### CSS (`styles.css`)
- Modern gradient background
- Responsive grid layout
- Color-coded cells (given, solved, invalid)
- Smooth animations
- Mobile-friendly design

### JavaScript (`script.js`)
- Backtracking solver algorithm
- Input validation
- Puzzle loading system
- Animation effects
- Performance tracking

## 🎯 Difficulty Levels

| Difficulty | Empty Cells | Description |
|------------|-------------|-------------|
| Easy       | ~35         | Good for beginners |
| Medium     | ~45         | Moderate challenge |
| Hard       | ~52         | Requires logic |

## 🔧 Technical Details

- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: Pure CSS3 with Flexbox and Grid
- **No Dependencies**: Runs entirely in the browser
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## 📚 Learning Objectives

This project demonstrates:
- ✅ Backtracking algorithm implementation
- ✅ Constraint satisfaction problem solving
- ✅ Recursive problem solving
- ✅ Algorithm complexity analysis
- ✅ Interactive web development

## 🐛 Known Limitations

- Very large solving animations may be slow on older devices
- Animation speed is fixed (can be adjusted in code)

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your own learning!

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of DAA (Design and Analysis of Algorithms) Final Project
Made By:
- Ayush Kumar Dheeraj (23BCS10465)
- Piyush Singh (23BCS13623)
- Uchit Yadav (23BCS10465)

---

**Enjoy solving Sudoku puzzles! 🎉**

