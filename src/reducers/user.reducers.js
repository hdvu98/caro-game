import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO,
    CHANGE_INFO,
    CHANGE_PASSWORD} from '../constant';

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
            return {
                loggedIn:false,
                user: undefined
            };
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
        case CHANGE_INFO:
            return{
                user: action.payload
            }
        case CHANGE_PASSWORD:
            return state;
        default:
            return state
        }
  };

  export default userReducers;