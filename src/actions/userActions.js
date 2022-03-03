import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
} from '../constants/userConstants'
import { SW_API_URL, SECRET_KEY } from '../constants/apiConstants'
import axios from 'axios'
// import aes from 'crypto-js/aes'
// import CryptoJS from 'crypto-js'

export const login = (username, password) => async (dispatch) => {
  const loginError = new Error('Error: Usuario y/o contraseña incorrectos')
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const firstName = username.split(' ')[0]
    const { data } = await axios.get(`${SW_API_URL}/people/?search=${firstName.toLowerCase()}`)
    let userData = {}
    // Handle user auth
    if (Number(data.count) === 1) {
      let foundUsername = data.results[0].name
      let foundHairColor = data.results[0].hair_color

      // Validate if username exists, if not, throw error
      if (foundUsername !== username) {
        throw loginError
      }

      // Password validation
      let CryptoJS = require("crypto-js")

      let encryptedHairC = CryptoJS.AES.encrypt(foundHairColor, SECRET_KEY).toString()
      let decryptedPassword = CryptoJS.AES.decrypt(password, SECRET_KEY).toString(CryptoJS.enc.Utf8)

      console.log('Intentional security hole... encrypted= ' + encryptedHairC)

      if (decryptedPassword !== foundHairColor) {
        throw loginError
      }
      // On valid password
      userData = data.results[0]
    }
    else {
      throw loginError
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userData,
    })
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }
  catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: USER_LIST_RESET })
  // dispatch({ type: USER_REGISTER_RESET })
}