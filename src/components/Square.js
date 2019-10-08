import React from 'react';

export default function Square(props) {
  const { value, showWinLine, onClick } = props;
  return (
    <button
      type="button"
      className={`square ${value === 'X' ? 'blue' : ''} 
      ${value === 'O' ? 'red' : ''}
      ${showWinLine ? 'winPos' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
