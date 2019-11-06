/* eslint-disable no-undef */
import { 
  LOADING,
  LOGIN,
  LOGIN_ERROR,
  GET_INFO,
  REGISTER,
  REGISTER_SUCCESS,
  LOGOUT,
  CHANGE_INFO ,
  CHANGE_INFO_SUCCESS ,
  CHANGE_PASSWORD_SUCCESS ,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCES,
  FAILED_GET_INFO,
} from '../constant';
    
const uploadAvatarUser = (user) =>({
  type:UPLOAD_AVATAR,
  payload:user
})
const loginUser = (userObj) => ({
    type: LOGIN,
    payload: userObj
})

const registerUser = userObj =>({
    type: REGISTER,
    payload: userObj
})
const logOutUser =()=>({
    type:LOGOUT
})
const getInfoUser = (userObj) =>({
    type:GET_INFO,
    payload: userObj
})
const failedToGetInfo = ()=>({
  type: FAILED_GET_INFO
})
export const register = user => {
    return dispatch => {
      return fetch("https://game-caro-api.herokuapp.com/user/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            dispatch(()=>({type: REGISTER_SUCCESS, payload: data.message}));
          } 
          else{
            dispatch(registerUser(data))
          }
        })
    }
  }
export const login = user => {
    return (dispatch) => {
        return fetch("https://game-caro-api.herokuapp.com/user/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                dispatch(()=>({type: LOGIN_ERROR, payload: data.message}));
            } 
            if (data.token) {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
            }
        }) .catch((error) => {
          console.log(error);
      });
    }
    }
export const getInfo =  () => {
    return (dispatch) => {
      dispatch({type: LOADING})
      const token =  localStorage.getItem('token');
        return fetch("https://game-caro-api.herokuapp.com/me", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => {
            if(resp.status !== 401) return resp.json()
            return {message: "Please login!"}
          }
            )
          .then(data => {
              // localStorage.removeItem("token")
              if(data.user)
               {
                  return dispatch(getInfoUser(data.user))
               }
                return dispatch(failedToGetInfo());
          })
      }
  }
export const changePassword = user =>{
  return (dispatch) => {
    return fetch("https://game-caro-api.herokuapp.com/user/change-password", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
    })
    .then(resp => { 
      return resp.json()})
    .then(data => {
        if (data.message) {
            dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data.message})
        } 
        if (data.token) {
          localStorage.removeItem("token");
          localStorage.setItem("token", data.token)
          dispatch(loginUser(data.user))
        }
    }) .catch((error) => {
      console.log(error);
  });
}
}

export const changeProfile = user =>{
  return (dispatch) => {
    dispatch({type: LOADING})
    const token = localStorage.getItem('token');
      return fetch("https://game-caro-api.herokuapp.com/user/editProfile", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            dispatch(()=>({type: CHANGE_INFO_SUCCESS, payload: data.message}));
          } 
          dispatch(loginUser(data.user))
        }).catch((error) => {
              console.log(error);
          })
    }
}

export const logOut = () =>{
  if(localStorage.getItem('token')){
    localStorage.removeItem('token');
  }
  return logOutUser();
}

export const uploadAvatar=user=>{
  return (dispatch) =>{
    const token = localStorage.getItem('token');
    return fetch("https://game-caro-api.herokuapp.com/user/upload-avatar", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          dispatch(()=>({type: UPLOAD_AVATAR_SUCCES, payload: data.message}));
        } 
        if (data.user) {
              dispatch(uploadAvatarUser(data.user))
              }
      }).catch((error) => {
            console.log(error);
        })
  }
}