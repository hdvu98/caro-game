import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    const { winner } = this.props;
    let showWinLine = false;
    if (winner) {
      const winPositions = winner.winPos;
      if (winPositions) {
        for (let index = 0; index < winPositions.length; index += 1) {
          if (winPositions[index] === i) {
            showWinLine = true;
            break;
          }
        }
      }
    }
    const { squares } = this.props;
    const { onClick } = this.props;
    return (
      <Square
        key={i}
        showWinLine={showWinLine}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  renderRow(rowIndex) {
    const row = [];
    for (let i = 0; i < 20; i += 1) {
      const square = this.renderSquare(rowIndex * 20 + i);
      row.push(square);
    }
    return (
      <div key={rowIndex} className="board-row d-flex justify-content-center">
        {row}
      </div>
    );
  }

  renderBoard() {
    const board = [];
    for (let i = 0; i < 20; i += 1) {
      const row = this.renderRow(i);
      board.push(row);
    }
    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}
