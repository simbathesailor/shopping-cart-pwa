import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as CartActions from "./actions"
import { getItemsCount, getTotalValue } from "./selectors"

function mapStateToProps(state) {
  const { cart } = state
  const { cartItems } = cart
  const cartItemsCount = getItemsCount(cart)
  const cartTotal = getTotalValue(cart)
  return {
    cartItems,
    cartItemsCount,
    cartTotal,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...CartActions
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)