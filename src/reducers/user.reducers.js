import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO} from '../constant';

const userReducers= (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
            loggingIn: true,
            user: action.payload
            };
        case LOGOUT:
            return {};
        case GET_INFO:
            return {
                loggingIn: true,
                user: action.payload
                };
        case REGISTER:
            return {
                loggingIn: true,
                user: action.payload
                };
        default:
            return state
        }
  };

  export default userReducers;