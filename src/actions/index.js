import { RESTART, JUMP, SORT, HANDLE_CLICK } from '../constant';
import findEmptyPos from '../common/findEmptyPos';

export function restartGame() {
  return {
    type: RESTART
  };
}
export function jumpToStep(step) {
  return {
    type: JUMP,
    payload: step
  };
}
export function sortStep() {
  return {
    type: SORT
  };
}
export function handleClick(i) {
  return {
    type: HANDLE_CLICK,
    payload: i
  };
}

export const botPlay = (i) => (dispatch, getState) => {
  dispatch(handleClick(i));

  const { game } = getState();
  const { history, step } = game;
  const board = history[step]; 
  const {squares} = board;
  const botPos = findEmptyPos(squares, i);
  dispatch(handleClick(botPos));
};