import { PLAYERS, checkWinner, checkDraw, getEmptySquares } from './gameLogic.js';

export const DIFFICULTY = {
  EASY: 'easy',
  HARD: 'hard'
};

// Easy AI: Random moves
export const getEasyMove = (squares) => {
  const emptySquares = getEmptySquares(squares);
  if (emptySquares.length === 0) return null;
  
  // Randomly select a move
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

// Hard AI: Minimax algorithm
export const getHardMove = (squares, aiPlayer = PLAYERS.AI) => {
  const startTime = performance.now();
  let positionsEvaluated = 0;
  
  // Minimax function
  const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    positionsEvaluated++;
    
    const winner = checkWinner(board);
    if (winner) {
      return winner.winner === aiPlayer ? 10 - depth : depth - 10;
    }
    
    if (checkDraw(board)) {
      return 0;
    }
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      const emptySquares = getEmptySquares(board);
      
      for (let i = 0; i < emptySquares.length; i++) {
        const index = emptySquares[i];
        board[index] = aiPlayer;
        const evaluation = minimax(board, depth + 1, false, alpha, beta);
        board[index] = null; // Undo move
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      const emptySquares = getEmptySquares(board);
      
      for (let i = 0; i < emptySquares.length; i++) {
        const index = emptySquares[i];
        board[index] = PLAYERS.HUMAN;
        const evaluation = minimax(board, depth + 1, true, alpha, beta);
        board[index] = null; // Undo move
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  };
  
  // Find best move
  let bestMove = null;
  let bestScore = -Infinity;
  const emptySquares = getEmptySquares(squares);
  
  for (let i = 0; i < emptySquares.length; i++) {
    const index = emptySquares[i];
    squares[index] = aiPlayer;
    const score = minimax(squares, 0, false);
    squares[index] = null; // Undo move
    
    console.log(`Move ${index}: Score = ${score}`);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  
  const endTime = performance.now();
  const thinkingTime = endTime - startTime;
  
  console.log(`AI Hard Mode - Best move: ${bestMove}, Score: ${bestScore}`);
  console.log(`Positions evaluated: ${positionsEvaluated}`);
  console.log(`Thinking time: ${thinkingTime.toFixed(2)}ms`);
  
  return {
    move: bestMove,
    score: bestScore,
    positionsEvaluated,
    thinkingTime
  };
};

// Main AI function that chooses difficulty
export const getAIMove = (squares, difficulty, aiPlayer = PLAYERS.AI) => {
  if (difficulty === DIFFICULTY.EASY) {
    const move = getEasyMove(squares);
    return {
      move,
      score: 0,
      positionsEvaluated: 1,
      thinkingTime: 0
    };
  } else if (difficulty === DIFFICULTY.HARD) {
    return getHardMove(squares, aiPlayer);
  }
  
  return null;
};
