import { RESTART, JUMP, SORT, HANDLE_CLICK } from '../constant';

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
