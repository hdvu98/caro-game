import {fetch} from 'fetch';
import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO} from '../constant';
    
const loginUser = userObj => ({
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
      return fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
              console.log(data.message);
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(registerUser(data.user))
          }
        })
    }
  }
export const login = user => {
    return dispatch => {
        return fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({user})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
            } 
            else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
            }
        })
    }
    }
    export const getInfo = () => {
        return dispatch => {
          const token = localStorage.getItem('token');
          if (token) {
            return fetch("http://localhost:3000/me", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
              .then(resp => resp.json())
              .then(data => {
                if (data.message) {
                  localStorage.removeItem("token")
                } else {
                  dispatch(getInfoUser(data.user))
                }
              })
          }
        }
      }