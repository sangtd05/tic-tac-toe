import React from 'react';

const Square = ({ value, onClick, isWinning, disabled }) => {
  const getClassName = () => {
    let className = 'square';
    if (value) className += ` ${value.toLowerCase()}`;
    if (isWinning) className += ' winning';
    return className;
  };

  return (
    <button
      className={getClassName()}
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {value}
    </button>
  );
};

export default Square;
