import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as LoginActions from "./actions"

function mapStateToProps(state) {
  return {
    test: 1,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...LoginActions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)