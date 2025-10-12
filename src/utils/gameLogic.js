// Game logic utilities for TicTacToe

export const PLAYERS = {
  HUMAN: 'X',
  AI: 'O'
};

export const GAME_STATES = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw'
};

// Check if there's a winner
export const checkWinner = (squares) => {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: lines[i]
      };
    }
  }
  return null;
};

// Check if the game is a draw
export const checkDraw = (squares) => {
  return squares.every(square => square !== null) && !checkWinner(squares);
};

// Get empty squares (available moves)
export const getEmptySquares = (squares) => {
  return squares.map((square, index) => square === null ? index : null)
    .filter(val => val !== null);
};

// Make a move on the board
export const makeMove = (squares, index, player) => {
  if (squares[index] !== null) {
    return squares; // Invalid move
  }
  
  const newSquares = [...squares];
  newSquares[index] = player;
  return newSquares;
};

// Get game status
export const getGameStatus = (squares) => {
  const winnerResult = checkWinner(squares);
  if (winnerResult) {
    return {
      status: GAME_STATES.WIN,
      winner: winnerResult.winner,
      winningLine: winnerResult.winningLine
    };
  }
  
  if (checkDraw(squares)) {
    return {
      status: GAME_STATES.DRAW,
      winner: null,
      winningLine: null
    };
  }
  
  return {
    status: GAME_STATES.PLAYING,
    winner: null,
    winningLine: null
  };
};

// Initialize empty board
export const createEmptyBoard = () => {
  return Array(9).fill(null);
};
