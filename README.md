# TicTacToe AI Game

A React-based TicTacToe game featuring an AI opponent with multiple difficulty levels using the minimax algorithm.

## 🎮 Features

### Core Game Features
- ✅ Complete TicTacToe game with proper win/draw detection
- ✅ Clean, responsive UI that works on desktop and mobile
- ✅ New Game button to reset the board
- ✅ Clear indication of whose turn it is (player vs AI)
- ✅ Visual highlight of winning combination

### AI Implementation
- **Easy Mode**: Random valid moves - easily beatable
- **Hard Mode**: Full minimax implementation with alpha-beta pruning - unbeatable

### Additional Features
- **Score Tracking**: Track wins/losses/draws across multiple games
- **Performance Metrics**: Display AI thinking time and positions evaluated
- **Persistent Storage**: Scores saved in browser localStorage
- **Responsive Design**: Works on all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🎯 How to Play

1. **Choose Difficulty**: Select between Easy or Hard AI difficulty
2. **Make Your Move**: Click on any empty square to place your 'X'
3. **AI Response**: The AI will automatically make its move with 'O'
4. **Win Conditions**: Get 3 in a row (horizontally, vertically, or diagonally)
5. **New Game**: Click "New Game" to start over

## 🤖 AI Difficulty Levels

### Easy Mode
- Uses random move selection
- Occasionally misses obvious blocks
- Should be easily beatable by human players
- Perfect for beginners

### Hard Mode
- Implements minimax algorithm with alpha-beta pruning
- Evaluates all possible game states
- Unbeatable (worst case: draw)
- Console logs detailed move analysis

## 🧠 Minimax Algorithm Explanation

The Hard AI uses the minimax algorithm to find the optimal move:

1. **Evaluation**: Each game state is scored (+10 for AI win, -10 for human win, 0 for draw)
2. **Recursion**: The algorithm explores all possible future moves
3. **Minimization**: When it's the human's turn, it chooses the move with the lowest score
4. **Maximization**: When it's the AI's turn, it chooses the move with the highest score
5. **Alpha-Beta Pruning**: Optimizes the search by eliminating branches that won't affect the final decision