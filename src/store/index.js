import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
  history: [
    {
      squares: Array(400).fill(null)
    }
  ],
  step: 0,
  xIsNext: true,
  winner: null,
  position: null,
  isIncr: true
};

const store = createStore(reducer, initialState);

export default store;
