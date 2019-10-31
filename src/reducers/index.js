import { combineReducers } from 'redux';

import gameReducers from "./game.reducers";
import userReducers from "./user.reducers";

const reducer = combineReducers({
  game: gameReducers,
  user: userReducers
})

 export default reducer;
