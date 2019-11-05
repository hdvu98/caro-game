import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import Board from '../components/Board';
import * as actions from '../actions';

const socket = io('https://game-caro-api.herokuapp.com/',{ transport : ['websocket'] });

const GameOnline = props => {
    socket.on('connect', function(){});
  const {
    winner,
    step,
    xIsNext,
    history,
    position,
    isIncr,
    jumpToStep,
    handleClick,
    restartGame,
    sortStep,
    user
  } = props;
  const curBoard = history[step];
  let status;
  if (winner) {
    const {pos} = winner;
    if(pos ==='X'){
      status = `YOU WIN!`;
    }
    else{
      status = `YOU LOOSE!`;
    }
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((_key, move) => {
    if(move % 2===0){
      const desc = move ? `Step  ${move/2}` : `Start`;
      const liKey = move;
      return (
        <li key={liKey}>
          <button
            type="button"
            className={`${step === move ? 'step active' : 'step'} `}
            onClick={() => jumpToStep(move)}
          >
            {desc}
          </button>
        </li>
      );
    }

  });
  return (
    <div className="container">
      <div className="row main-content">
        <div className="col-12 col-md-8">
          <div className="game-info-heading text-center">CARO VIETNAM</div>
          <Board
            squares={curBoard.squares}
            winner={winner}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info col-12 col-md-4 justify-content-start">
          <div className="game-info-heading text-center">GAME INFO</div>
          <div>{user?user.username:''}</div>
          <div>{status}</div>
          <div>Lasted position: {position}</div>
          <div className="d-flex flex-row flex-nowrap justify-content-between align-items-center step-header">
            <div className="step-header-title">History</div>
            <button
              type="button"
              className="sort-btn"
              onClick={() => sortStep()}
            >
              {' '}
              <div className={`${isIncr ? 'down' : 'up'} `} />
            </button>
          </div>
          <div className="step-area">
            <ol
              className={`d-flex ${
                isIncr ? 'flex-column' : 'flex-column-reverse'
              } ${winner? 'disable-step':''} `} 
            >
              {moves}
            </ol>
          </div>
          <div className="step-footer" />
          <button
            type="button"
            className="btn btn-primary mt-3 w-100"
            onClick={() => restartGame()}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const {game} = state;
  const {user} = state;
  return {
    history: game.history,
    step: game.step,
    xIsNext: game.xIsNext,
    winner: game.winner,
    position: game.position,
    isIncr: game.isIncr,
    user : user.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleClick: actions.botPlay,
      jumpToStep: actions.jumpToStep,
      sortStep: actions.sortStep,
      restartGame: actions.restartGame,
    },
    dispatch
  );
}

const GameOnlineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOnline);

export default GameOnlineContainer;
