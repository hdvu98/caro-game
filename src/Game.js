import React from 'react';
import Board from './Board';

function calculateWinner(board,curPos) {
  let cursor = curPos;
  let count = 1;
  let winPos =[]; 

  //  row

  while(cursor>=0 && board[cursor] === board[cursor-1]){
     cursor -=1 }
  while(board[cursor] === board[cursor+1] && cursor <=400){
    winPos.push(cursor);
    cursor+=1;
    count+=1;
  }
  if(count>5) {
    winPos.push(cursor);
    return {pos: board[curPos], winPos}
  }
  if(count === 5){
    if(board[cursor+1] === null ){
      winPos.push(cursor);
      return {
        pos: board[curPos], winPos
      };
    }
  }
  winPos =[];
  //  column
  cursor = curPos;
  count = 1;
  while(cursor>=0 && board[cursor] === board[cursor-20]){
    cursor-=20;}
 while(board[cursor] === board[cursor+20] && cursor<=400){
   winPos.push(cursor);
   cursor+=20;
   count+=1;
 }
 if(count>5) {
  winPos.push(cursor);
   return {pos: board[curPos], winPos}
  }
if(count === 5){
   if(board[cursor+20] === null ){
    winPos.push(cursor);
     return {pos: board[curPos], winPos}
   }
 }
 // cross 1
 winPos=[];
 cursor = curPos;
 count = 1;
 while(cursor>=0 && board[cursor] === board[cursor-21]){
   cursor-=21;}
while(board[cursor] === board[cursor+21] && cursor<=400){
  winPos.push(cursor);
  cursor+=21;
  count+=1;
}
if(count>5) {
  winPos.push(cursor);
  return {pos: board[curPos], winPos};
}
if(count === 5){
  if(board[cursor+21] === null ){
    winPos.push(cursor);
    return {pos: board[curPos], winPos};
  }
}
 // cross 2
 winPos =[];
 cursor = curPos;
 count = 1;
 while(cursor>=0 && board[cursor] === board[cursor-19]){
   cursor-=19;}
while(board[cursor] === board[cursor+19] && cursor<=400){
  winPos.push(cursor);
  cursor+=19;
  count+=1;
}
if(count>5) {
  winPos.push(cursor);
  return {pos: board[curPos], winPos};
}
if(count === 5){
  if(board[cursor+19] === null ){
    winPos.push(cursor);
    return {pos: board[curPos], winPos};
  }
}
  return null;

}

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(400).fill(null),
          }
        ],
        step: 0,
        xIsNext: true,
        winner: null,
        position: null,
        isIncr: true
      };
    }


    restartGame=()=>{
        this.setState (
        {
        history: [
          {
            squares: Array(400).fill(null),
          }
        ],
        step: 0,
        xIsNext: true,
        winner: null
        }
          );
    }

    jumpToStep(step){
      const xIsNext = (step % 2)===0;
      this.setState({
        step,
        xIsNext
      });
    }

    
    handleClick(i) {
      const {history} = this.state;
      const {step} = this.state;
      const {xIsNext} = this.state;
      const myhistory = [...history.slice(0, step + 1)];
      const squares = myhistory[myhistory.length -1 ].squares.slice();
      squares[i] = xIsNext ? "X" : "O";
      const checkWinner = calculateWinner(squares,i);
      const {winner} = this.state;
      if(winner || history[step].squares[i] ){
        return;
      }
      const xPos = (i - i%20)/20;
      const yPos = i - xPos*20;
      this.setState({
        history: history.concat([
          {
            squares
          }
        ]),
        xIsNext: !xIsNext,
        step: history.length,
        position:  `( ${xPos} , ${yPos})` ,
        winner: checkWinner
      });
    }

    sortStep(){
      const state = this;
      const isIncr = this.state;
      this.setState({...state, isIncr: !isIncr})
    }
  
    render() {
      const {winner,step,xIsNext,history,position,isIncr} = this.state;
      const curBoard = history[step];
      let status;
      if (winner) {
        status = `Winner:  ${winner.pos}`;
      } else {
        status = `Next player: ${(xIsNext ? "X" : "O")}`;
      }
  

      const moves = history.map((_key, move) => {
        const desc = move ?
          `Step  ${move}` :
          `Start`;
        const liKey=move;
        return (
          <li key={liKey}>
            <button type="button" className={`${step === move ?'step active':'step'} `} onClick={() => this.jumpToStep(move)}>{desc}</button>
          </li>
        );
      });
      return (
        <div className="container">
          <div className="row main-content">
          <div className="col-12 col-md-8">
          <div className="game-info-heading text-center">CARO VIETNAM</div>
            <Board
              squares={curBoard.squares}
              winner = {winner}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info col-12 col-md-4 justify-content-start">
            <div className="game-info-heading text-center">GAME INFO</div>
            <div>{status}</div>
            <div>Position: {position}</div>
            <div className="d-flex flex-row flex-nowrap justify-content-between align-items-center step-header">
            <div className="step-header-title">History</div>
            <button type="button" className="sort-btn" onClick={()=>this.sortStep()}> <div className={`${isIncr?'down':'up'} `} /></button>
            </div>
            <div className="step-area">
              <ol className={`d-flex ${isIncr?'flex-column':'flex-column-reverse'} `} >{moves}</ol>
            </div>
            <div className="step-footer"/>
            <button type="button" className="btn btn-primary mt-3 w-100" onClick={this.restartGame}>New Game</button>
          </div>
        </div>
        </div>

      );
    }
  }
  
  