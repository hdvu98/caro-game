export default function calculateWinner(board, curPos) {
  let cursor = curPos;
  let count = 1;
  let winPos = [];

  //  row

  while (cursor >= 0 && board[cursor] === board[cursor - 1]) {
    cursor -= 1;
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
    if (board[cursor + 1] === null) {
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
    if (board[cursor + 20] === null) {
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
    if (board[cursor + 21] === null) {
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
    if (board[cursor + 19] === null) {
      winPos.push(cursor);
      return { pos: board[curPos], winPos };
    }
  }
  return null;
}
