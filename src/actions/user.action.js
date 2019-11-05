/* eslint-disable no-undef */

import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO,
    LOADING} from '../constant';
    
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
              console.log(data.message);
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
                console.log(data.message);
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
export const getInfo = () => {
    return (dispatch) => {
      const token = localStorage.getItem('token');
        return fetch("https://game-caro-api.herokuapp.com/me", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              // localStorage.removeItem("token")
            } else {
              dispatch(getInfoUser(data.user))
            }
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
            console.log(data.message);
        } 
        if (data.token) {
          console.log(token);
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
  dispatch({type: LOADING});
  return (dispatch) => {
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
            console.log(data.message)
          } 
          if (data.user) {
                dispatch(loginUser(data.user))
                }
        }).catch((error) => {
              console.log(error);
          })
    }
}

export const logOut = () =>{
  if(localStorage.getItem('token')){
    localStorage.removeItem('token');
  }
  return logOutUser;
}
