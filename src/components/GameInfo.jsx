import React from 'react';

const GameInfo = ({ 
  currentPlayer, 
  gameStatus, 
  winner, 
  score, 
  difficulty, 
  onDifficultyChange, 
  onNewGame,
  performanceMetrics 
}) => {
  const getStatusMessage = () => {
    if (gameStatus === 'win') {
      return winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!';
    }
    if (gameStatus === 'draw') {
      return '🤝 It\'s a Draw!';
    }
    return `Current Player: ${currentPlayer === 'X' ? 'You' : 'AI'}`;
  };

  const getStatusClassName = () => {
    if (gameStatus === 'win') return 'game-status win';
    if (gameStatus === 'draw') return 'game-status draw';
    return 'current-player';
  };

  return (
    <div className="game-info">
      <div className={getStatusClassName()}>
        {getStatusMessage()}
      </div>
      
      <div className="difficulty-selector">
        <h3>AI Difficulty</h3>
        <div className="difficulty-buttons">
          <button
            className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('easy')}
            disabled={gameStatus === 'playing'}
          >
            Easy
          </button>
          <button
            className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
            onClick={() => onDifficultyChange('hard')}
            disabled={gameStatus === 'playing'}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="score-board">
        <h3>Score Board</h3>
        <div className="score-item">
          <span className="score-label">Wins:</span>
          <span className="score-value">{score.wins}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Losses:</span>
          <span className="score-value">{score.losses}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Draws:</span>
          <span className="score-value">{score.draws}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Win Rate:</span>
          <span className="score-value">
            {score.total > 0 ? ((score.wins / score.total) * 100).toFixed(1) : 0}%
          </span>
        </div>
      </div>

      {performanceMetrics && (
        <div className="performance-metrics">
          <h4>AI Performance</h4>
          <div className="metric-item">
            <span>Positions Evaluated:</span>
            <span>{performanceMetrics.positionsEvaluated}</span>
          </div>
          <div className="metric-item">
            <span>Thinking Time:</span>
            <span>{performanceMetrics.thinkingTime.toFixed(2)}ms</span>
          </div>
          <div className="metric-item">
            <span>Move Score:</span>
            <span>{performanceMetrics.score}</span>
          </div>
        </div>
      )}

      <div className="controls">
        <button className="btn btn-primary" onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
