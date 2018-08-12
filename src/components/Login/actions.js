import * as LoginConsts from "./const"
import Cookies from "js-cookie"

const loginRequest = (payload) => ({
  type: LoginConsts.LOGIN_REQUEST,
  payload,
})

const loginSuccess = (payload) => ({
  type: LoginConsts.LOGIN_SUCCESS,
  payload,
})

const loginFailure = (payload) => ({
  type: LoginConsts.LOGIN_FAILURE,
  payload,
})

const login = (payload) => {
  return (dispatch) => {
    dispatch(loginRequest())
    //make the api call here
    //in success block, save the cookie
    let success = true
    if(success) {
      Cookies.set("access-token", "test_token", {expires: 1})
      dispatch(loginSuccess())
    } else {
      dispatch(loginFailure())
    }
    
  }
}
export {
  loginRequest,
  loginSuccess,
  loginFailure,
  login,
}