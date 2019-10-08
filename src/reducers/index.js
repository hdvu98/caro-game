import { RESTART, JUMP, SORT, HANDLE_CLICK } from '../constant';
import calculateWinner from '../common/findWinner';

export default (state, action) => {
  switch (action.type) {
    case RESTART:
      return {
        ...state,
        history: [
          {
            squares: Array(400).fill(null)
          }
        ],
        step: 0,
        xIsNext: true,
        winner: null
      };
    case JUMP: {
      const step = action.payload;
      const xIsNext = step % 2 === 0;
      return {
        ...state,
        step,
        xIsNext
      };
    }
    case SORT: {
      const { isIncr } = state;
      return {
        ...state,
        isIncr: !isIncr
      };
    }
    case HANDLE_CLICK: {
      const { history, step, xIsNext } = state;
      const myhistory = [...history.slice(0, step + 1)];
      const squares = myhistory[myhistory.length - 1].squares.slice();
      const i = action.payload;
      squares[i] = xIsNext ? 'X' : 'O';
      const checkWinner = calculateWinner(squares, i);
      const { winner } = state;
      if (winner || history[step].squares[i]) {
        return state;
      }
      const xPos = (i - (i % 20)) / 20;
      const yPos = i - xPos * 20;
      return {
        ...state,
        history: myhistory.concat([
          {
            squares
          }
        ]),
        xIsNext: !xIsNext,
        step: myhistory.length,
        position: `( ${xPos} , ${yPos})`,
        winner: checkWinner
      };
    }
    default:
      return state;
  }
};
