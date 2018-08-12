import * as StudentDataConsts from "./const"
import Cookies from "js-cookie"

const studentDataRequest = (payload) => ({
  type: StudentDataConsts.STUDENT_DATA_REQUEST,
  payload,
})

const studentDataSuccess = (payload) => ({
  type: StudentDataConsts.STUDENT_DATA_SUCCESS,
  payload,
})

const studentDataFailure = (payload) => ({
  type: StudentDataConsts.STUDENT_DATA_FAILURE,
  payload,
})

const getStudentData = (payload) => {
  return (dispatch) => {
    dispatch(studentDataRequest())
    
    fetch(" https://api.myjson.com/bins/1dlper").then((result) => {
      return result.json()
    }).then((result1) => {
      dispatch(studentDataSuccess(result1))
    }).catch((err) => {
      dispatch(studentDataFailure(err))
    })
    
  }
}
export {
  studentDataRequest,
  studentDataSuccess,
  studentDataFailure,
  getStudentData,
}