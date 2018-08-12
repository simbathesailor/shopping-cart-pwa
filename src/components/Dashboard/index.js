import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { totalMarksData } from "./utils"
import * as StudentDataActions from "./actions"

function mapStateToProps(state) {
  const studentData = totalMarksData(state)
  return {
    test: 1,
    studentData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...StudentDataActions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)