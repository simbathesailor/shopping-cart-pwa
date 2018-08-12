import * as StudentDataConsts from "./const"

const initialAuthState = {
  data : null,
  isFetching: false,
  isFetched: false,
  isFailure: false
}

function Dashboard(state = initialAuthState, action) {
  switch(action.type) {
    case StudentDataConsts.STUDENT_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      }
    case StudentDataConsts.STUDENT_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: false,
        data: action.payload
      }
    case StudentDataConsts.STUDENT_DATA_FAILURE:
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


export default Dashboard