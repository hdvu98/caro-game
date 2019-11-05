export default function calculateWinner(board, curPos) {
  let cursor = curPos;
  let count = 1;
  let winPos = [];
  let isLeftBlocked = false;
  let isTopBlocked = false;
  let isTopLeftBlocked = false;
  let isTopRightBlocked =false;
  //  row

  while (cursor >= 0 && board[cursor] === board[cursor - 1]) {
    cursor -= 1;
  }
  if(cursor >= 1){
    if(board[cursor-1] !== null){
      isLeftBlocked = false;
    }
  }
  while (board[cursor] === board[cursor + 1] && cursor <= 400) {
    winPos.push(cursor);
    cursor += 1;
    count += 1;
  }
  if (count > 5) {
    winPos.push(cursor);
    return { pos: board[curPos], winPos };
  }
  if (count === 5) {
    if (board[cursor + 1] === null || (!isLeftBlocked )) {
      winPos.push(cursor);
      return {
        pos: board[curPos],
        winPos
      };
    }
  }
  winPos = [];
  //  column
  cursor = curPos;
  count = 1;
  while (cursor >= 0 && board[cursor] === board[cursor - 20]) {
    cursor -= 20;
  }
  if(cursor-20>=0){
    if(board[cursor-20]!==  null){
      isTopBlocked = true;
    }
  }
  while (board[cursor] === board[cursor + 20] && cursor <= 400) {
    winPos.push(cursor);
    cursor += 20;
    count += 1;
  }
  if (count > 5) {
    winPos.push(cursor);
    return { pos: board[curPos], winPos };
  }
  if (count === 5) {
    if (board[cursor + 20] === null || (!isTopBlocked )) {
      winPos.push(cursor);
      return { pos: board[curPos], winPos };
    }
  }
  // cross 1
  winPos = [];
  cursor = curPos;
  count = 1;
  while (cursor >= 0 && board[cursor] === board[cursor - 21]) {
    cursor -= 21;
  }
  if(cursor - 21 >=0){
    if(board[cursor - 21] !== null){
      isTopLeftBlocked = true;
    }
  }
  while (board[cursor] === board[cursor + 21] && cursor <= 400) {
    winPos.push(cursor);
    cursor += 21;
    count += 1;
  }
  if (count > 5) {
    winPos.push(cursor);
    return { pos: board[curPos], winPos };
  }
  if (count === 5) {
    if (board[cursor + 21] === null || (!isTopLeftBlocked)) {
      winPos.push(cursor);
      return { pos: board[curPos], winPos };
    }
  }
  // cross 2
  winPos = [];
  cursor = curPos;
  count = 1;
  while (cursor >= 0 && board[cursor] === board[cursor - 19]) {
    cursor -= 19;
  }
  if(cursor - 19 >=0){
    if(board[cursor - 19]!== null){
      isTopRightBlocked = true
    }
  }
  while (board[cursor] === board[cursor + 19] && cursor <= 400) {
    winPos.push(cursor);
    cursor += 19;
    count += 1;
  }
  if (count > 5) {
    winPos.push(cursor);
    return { pos: board[curPos], winPos };
  }
  if (count === 5) {
    if (board[cursor + 19] === null || (!isTopRightBlocked )) {
      winPos.push(cursor);
      return { pos: board[curPos], winPos };
    }
  }
  return null;
}
