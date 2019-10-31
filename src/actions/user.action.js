
import {REGISTER,
    LOGIN,
    LOGOUT,
    GET_INFO} from '../constant';
    
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
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
              console.log(data.message);
          } else {
            console.log(data);
            localStorage.setItem("token", data.jwt)
            dispatch(registerUser(data.user))
          }
        })
    }
  }
export const login = user => {
    return (dispatch) => {
        return fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          // 'Access-Control-Allow-Origin': 'http://localhost:3000',
          // 'Access-Control-Allow-Credentials': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
            } 
            else {
              console.log(data);
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
            }
        }) .catch((error) => {
          console.log(error);
      });
    }
    }
    // export const getInfo = () => {
    //     return dispatch => {
    //       const token = localStorage.getItem('token');
    //       if (token) {
    //         return fetch("https://game-caro-api.herokuapp.com/me", {
    //           method: "GET",
    //           headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //             'Authorization': `Bearer ${token}`
    //           }
    //         })
    //           .then(resp => resp.json())
    //           .then(data => {
    //             if (data.message) {
    //               localStorage.removeItem("token")
    //             } else {
    //               dispatch(getInfoUser(data.user))
    //             }
    //           })
    //       }
    //     }
    //   }