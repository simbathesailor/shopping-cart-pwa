import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as CartActions from "./actions"
import { getItemsCount, getTotalValue } from "./selectors"
import isEmpty from "lodash/isEmpty"

function mapStateToProps(state) {
  const { cart } = state
  let { cartItems } = cart
  const cartItemsCount = getItemsCount(cart)
  let cartTotal = getTotalValue(cart)
  if(isEmpty(cartItems)) {
    const cartItemsSession = sessionStorage.getItem("cartItems")
    const cartTotalSession = sessionStorage.getItem("cartTotal")
    if(cartItemsSession) {
      cartItems = JSON.parse(cartItemsSession)
    }
    if(cartTotalSession) {
      cartTotal = JSON.parse(cartTotalSession).cartTotal
    }
  }
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