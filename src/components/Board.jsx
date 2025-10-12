import React from 'react';
import Square from './Square';

const Board = ({ squares, onSquareClick, winningLine, disabled }) => {
  const renderSquare = (index) => {
    const isWinning = winningLine && winningLine.includes(index);
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onSquareClick(index)}
        isWinning={isWinning}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="game-board">
      {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
    </div>
  );
};

export default Board;
