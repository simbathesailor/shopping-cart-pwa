import * as LoginConsts from "./const"

const initialAuthState = {
  user : null,
  isLoggedIn: false,
  isFetching: false,
  isFetched: false,
  isFailure: false
}

function Login(state = initialAuthState, action) {
  switch(action.type) {
    case LoginConsts.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      }
    case LoginConsts.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: false,
      }
    case LoginConsts.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: true,
    }
    default:
      return state
  }
}


export default Login