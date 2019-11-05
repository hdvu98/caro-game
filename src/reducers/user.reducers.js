import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO,
    CHANGE_INFO,
    CHANGE_PASSWORD,
    LOADING,
    UPLOAD_AVATAR} from '../constant';

const initialState = {
    user:{
    
    }
    
    };
const userReducers= (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_AVATAR:
            return{
                user: action.payload,
                loading: false,
                loggedIn: true,
            }
        case LOADING:
            return{loading: true}
        case LOGIN:
            return {
            loading:false,
            loggedIn: true,
            user: action.payload
            };
        case LOGOUT:
            return {
                loading:false,
                loggedIn:false,
                user: undefined
            };
        case GET_INFO:
            return {
                loading:false,
                loggedIn: true,
                user: action.payload
                };
        case REGISTER:
            return {
                loading:false,
                loggedIn: true,
                user: action.payload
                };     
        case CHANGE_INFO:
            return{
                loading:false,
                user: action.payload
            }
        case CHANGE_PASSWORD:
            return state;
        default:
            return state
        }
  };

  export default userReducers;