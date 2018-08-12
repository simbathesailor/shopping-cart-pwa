
import { createSelector } from "reselect"



const addMarks = (marksObj) => {
  return Object.keys(marksObj).reduce((acc, subject) => {
    return acc += marksObj[subject]
  }, 0)
}

const getStudentData = (state) => state.dashboard.data

const totalMarksData = createSelector(
  getStudentData,
  (studentData) => {
    if(!studentData)
    return null
    return Object.keys(studentData).reduce((acc, rollNo) => {
      const copyData = {...studentData[rollNo]}
      copyData.totalMarks = addMarks(copyData.marks)
      acc[rollNo] = copyData
      return acc
    }, {})
  }
)

export {
  totalMarksData,
}