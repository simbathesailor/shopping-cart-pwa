import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ResultActions from "./actions"
import * as CartActions from "components/Cart/actions"
import { getFilteredResults, getUniqueBrands, getMaxMinPrice } from "components/Results/selectors"

function mapStateToProps(state) {
  const { cartItems } = state.cart
  const results = getFilteredResults(state.results)
  const uniqueBrands = getUniqueBrands(state.results)
  const {max, min} = getMaxMinPrice(state.results)
  return {
    items: results,
    cartItems,
    uniqueBrands,
    max,
    min,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ResultActions,
    ...CartActions,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)