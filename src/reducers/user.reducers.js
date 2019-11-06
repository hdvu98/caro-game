import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO,
    CHANGE_INFO,
    CHANGE_PASSWORD,
    LOADING,
    UPLOAD_AVATAR,
    FAILED_GET_INFO,
    CHANGE_PASSWORD_SUCCESS,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    UPLOAD_AVATAR_SUCCES,
    CHANGE_INFO_SUCCESS} from '../constant';

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
        case FAILED_GET_INFO:
            return {
                loading: false,
                loggedIn: false,
                user: undefined
            }
        case REGISTER:
            return {
                loading:false,
                loggedIn: false,
                user: action.payload
                };     
        case CHANGE_INFO:
            return{
                loading:false,
                user: action.payload
            }
        case CHANGE_PASSWORD:
            return state;
        case CHANGE_PASSWORD_SUCCESS:
            return {
                loading: false,
                passwordMsg: action.payload
            }
        case LOGIN_ERROR:
            return{
                loading: false,
                loginMsg: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                loading: false,
                registerMsg: action.payload
            }
        case UPLOAD_AVATAR_SUCCES:
            return {
                loading: false,
                avatarMsg: action.payload
            }
        case CHANGE_INFO_SUCCESS:
            return {
                loading: false,
                infoMsg: action.payload
            }
        default:
            return state
        }
  };

  export default userReducers;