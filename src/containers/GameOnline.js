import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import{ TextField,DialogTitle} from '@material-ui/core/';
import Board from '../components/Board';
import * as actions from '../actions';

const socket = io('https://game-caro-api.herokuapp.com/', {transports: ['websocket', 'polling', 'flashsocket']});

class GameOnline extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isJoinedGame: false,
      leave: false,
      isStart: false
    }
  }

  componentDidMount(){
   
  }

  handleNewGame=()=>{
    socket.emit('connection');
    const {username}= this.props.user || {username: "unknow"};
    socket.emit('createNewGame', {name: username});
    socket.on('newGame', (data)=>{
      const {room}=data;
      this.setState({
        room,
        isJoinedGame: true
      },()=>{
        socket.on('player1',(data)=>{
          if(data){
            this.setState({...this.state,openJoin:false, isJoinedGame: true,isStart: true});
          }
        })
      })
      // eslint-disable-next-line no-alert
      alert(`send ID room to your friend: ${room}`);
    });
  }

  handleJoinGame=()=>{
    socket.emit('connection');
    const {room} = this.state;
    const {username}= this.props.user || {usrname: "unknow"};
    socket.emit('joinGame', {name: username, room});
    socket.on('player2',(data)=>{
      if(data){
        this.setState({...this.state,openJoin:false, isJoinedGame: true,isStart: true});
      }
    })
  }

  handleExit =()=>{
    this.setState({leave: true});
  }

  handleOnchangeID=(e)=>{
    this.setState({...this.state,[e.target.name]:e.target.value});
  }

  handleOPenJoin=()=>{
    this.setState({...this.state,openJoin: true});
  }

  handleCloseJoin=()=>{
    this.setState({...this.state, isJoinedGame: false, openJoin: false})
  }

  renderFormDialog(){
    const {openJoin, room} = this.state;
  return (
    <div>
      <Dialog open={openJoin} onClose={this.handleCloseJoin} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">JOIN ROOM</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Room ID:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room ID"
            type="text"
            fullWidth
            name="room"
            value ={room}
            onChange= {this.handleOnchangeID}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseJoin} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleJoinGame} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

  renderDialog(){
    const {isJoinedGame, leave} = this.state;
    return  leave? 
    <Redirect to='/' />:
    (<div>
      <Dialog
        open={!isJoinedGame}
        onClose={this.handleExit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">JOIN THE ROOM AND ENJOY THE GAME</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let click JOIN GAME to join the game, and match with other player then play the game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleNewGame} color="primary">
            NEW ROOM
          </Button>
          <Button onClick={this.handleOPenJoin} color="primary" autoFocus>
            JOIN EXISTING ROOM
          </Button>
          <Button onClick={this.handleExit} color="primary" >
            EXIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }

  render(){
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
  } = this.props;
  const {room, isStart} = this.state;
  const joinDialog = this.renderDialog();
  const joinExist = this.renderFormDialog();
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
         {joinDialog}
         {joinExist}
      <div className={`${!isStart? 'disable-step row main-content' : 'row main-content'} `}>
        <div className="col-12 col-md-8">
          <div className="game-info-heading text-center">CARO VIETNAM | {room}</div>
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
}
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
