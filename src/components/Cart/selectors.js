import { createSelector } from "reselect"

const getCartItem = (cartState) => cartState.cartItems

const getItemsCount = createSelector(
  getCartItem,
 (cartItems) => {
   return Object.keys(cartItems).length
 }
)

const getTotalValue = createSelector(
  getCartItem,
  (cartItems) => {
    return Object.keys(cartItems).reduce((acc, element) => {
      acc += cartItems[element].quantity * parseInt(cartItems[element].mrp, 10)
      return acc
    }, 0)
  }
)
export {
  getItemsCount,
  getTotalValue, 
}