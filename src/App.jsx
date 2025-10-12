import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { PLAYERS, GAME_STATES, createEmptyBoard, getGameStatus, makeMove } from './utils/gameLogic';
import { getAIMove, DIFFICULTY } from './utils/ai';

const App = () => {
  // Game state
  const [squares, setSquares] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.HUMAN);
  const [gameStatus, setGameStatus] = useState(GAME_STATES.PLAYING);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  // Score tracking
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('ticTacToeScore');
    return savedScore ? JSON.parse(savedScore) : { wins: 0, losses: 0, draws: 0, total: 0 };
  });

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ticTacToeScore', JSON.stringify(score));
  }, [score]);

  // Update game status when squares change
  useEffect(() => {
    const status = getGameStatus(squares);
    setGameStatus(status.status);
    setWinner(status.winner);
    setWinningLine(status.winningLine);

    // Update score when game ends
    if (status.status === GAME_STATES.WIN || status.status === GAME_STATES.DRAW) {
      updateScore(status);
    }
  }, [squares]);

  // AI move when it's AI's turn
  useEffect(() => {
    if (currentPlayer === PLAYERS.AI && gameStatus === GAME_STATES.PLAYING) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus]);

  const updateScore = (status) => {
    setScore(prevScore => {
      const newScore = { ...prevScore, total: prevScore.total + 1 };
      
      if (status.status === GAME_STATES.WIN) {
        if (status.winner === PLAYERS.HUMAN) {
          newScore.wins += 1;
        } else {
          newScore.losses += 1;
        }
      } else if (status.status === GAME_STATES.DRAW) {
        newScore.draws += 1;
      }
      
      return newScore;
    });
  };

  const makeAIMove = useCallback(() => {
    const aiResult = getAIMove(squares, difficulty, PLAYERS.AI);
    
    if (aiResult && aiResult.move !== null) {
      setSquares(prevSquares => makeMove(prevSquares, aiResult.move, PLAYERS.AI));
      setCurrentPlayer(PLAYERS.HUMAN);
      setPerformanceMetrics(aiResult);
    }
  }, [squares, difficulty]);

  const handleSquareClick = (index) => {
    if (squares[index] !== null || currentPlayer !== PLAYERS.HUMAN || gameStatus !== GAME_STATES.PLAYING) {
      return;
    }

    const newSquares = makeMove(squares, index, PLAYERS.HUMAN);
    setSquares(newSquares);
    setCurrentPlayer(PLAYERS.AI);
    setPerformanceMetrics(null); // Clear previous AI metrics
  };

  const handleNewGame = () => {
    setSquares(createEmptyBoard());
    setCurrentPlayer(PLAYERS.HUMAN);
    setGameStatus(GAME_STATES.PLAYING);
    setWinner(null);
    setWinningLine(null);
    setPerformanceMetrics(null);
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (gameStatus === GAME_STATES.PLAYING) {
      return; // Don't allow difficulty change during game
    }
    setDifficulty(newDifficulty);
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, draws: 0, total: 0 });
  };

  return (
    <div className="app">
      <h1 className="game-title">TicTacToe AI</h1>
      
      <GameInfo
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        winner={winner}
        score={score}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={handleNewGame}
        performanceMetrics={performanceMetrics}
      />

      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        winningLine={winningLine}
        disabled={currentPlayer === PLAYERS.AI || gameStatus !== GAME_STATES.PLAYING}
      />

      <div className="controls">
        <button className="btn btn-secondary" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default App;
