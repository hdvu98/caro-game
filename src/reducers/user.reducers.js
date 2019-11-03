import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO} from '../constant';

const initialState = {
    user:{
    
    }
    
    };
const userReducers= (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
            loggedIn: true,
            user: action.payload
            };
        case LOGOUT:
            return {};
        case GET_INFO:
            return {
                loggedIn: true,
                user: action.payload
                };
        case REGISTER:
            return {
                loggedIn: true,
                user: action.payload
                };
        default:
            return state
        }
  };

  export default userReducers;