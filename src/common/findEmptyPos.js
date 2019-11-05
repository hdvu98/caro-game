const BOARD_SIZE = 20;
const ARRAY_SIZE = 400;
const findEmptyPos = (board, pos) => {
    let x = pos;
    let isDesc = true;
    while (x>=0 && x<= ARRAY_SIZE -1) {
        const left = x + 1;
        const right = x -1;
        const top = x - 20;
        const bottom = x + 20; 
        const topLeft = x - BOARD_SIZE - 1;
        const topRight = x - BOARD_SIZE + 1;
        const bottomLeft = x + BOARD_SIZE - 1;
        const bottomRight = x + BOARD_SIZE + 1;
      if (board[left] === null && left >= 0 && left <= ARRAY_SIZE - 1) return left;
      if (board[right] === null && right >= 0 && right <= ARRAY_SIZE - 1) return right;
      if (board[top] === null && top >= 0 && top <= ARRAY_SIZE - 1) return top;
      if (board[bottom] === null && bottom >= 0 && bottom <= ARRAY_SIZE - 1) return bottom;
      if (board[topLeft] === null && topLeft >= 0 && topLeft <= ARRAY_SIZE - 1) {
        return topLeft;
      }
      if (board[topRight] === null && topRight >= 0 && topRight <= ARRAY_SIZE - 1) {
        return topRight;
      }
      if (board[bottomLeft] === null && bottomLeft >= 0 && bottomLeft <= ARRAY_SIZE - 1) {
        return bottomLeft;
      }
      if (board[bottomRight] === null && bottomRight >= 0 && bottomRight <= ARRAY_SIZE - 1) {
        return bottomRight;
      }
      if(isDesc){
        x += 1;
        if(x===ARRAY_SIZE-1){
            isDesc =false;
            x = pos;
        }
      }
      else{
          x-=1;
      }
    }
    return null;
  };
export default findEmptyPos;  