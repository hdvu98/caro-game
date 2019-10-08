import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from '../components/Board';
import * as actions from '../actions';

// eslint-disable-next-line react/prefer-stateless-function
class Game extends React.Component {
  render() {
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
      sortStep
    } = this.props;
    const curBoard = history[step];
    let status;
    if (winner) {
      status = `Winner:  ${winner.pos}`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((_key, move) => {
      const desc = move ? `Step  ${move}` : `Start`;
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
            <div>{status}</div>
            <div>Position: {position}</div>
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
                } `}
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
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
    step: state.step,
    xIsNext: state.xIsNext,
    winner: state.winner,
    position: state.position,
    isIncr: state.isIncr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleClick: actions.handleClick,
      jumpToStep: actions.jumpToStep,
      sortStep: actions.sortStep,
      restartGame: actions.restartGame
    },
    dispatch
  );
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
