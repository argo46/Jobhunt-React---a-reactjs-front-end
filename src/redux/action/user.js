import axios from 'axios'

export const login =  (dataLogin) => {
  return {
    type: 'LOGIN',
    payload: axios.post('http://localhost:3000/user/login', dataLogin ,{'Content-Type': 'application/x-www-form-urlencoded'})
  }
}

export const logout =  () => {
  return {
    type: 'LOGOUT'
  }
}