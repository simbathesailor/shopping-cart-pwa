import * as CartConstants from "./consts"

const initialAuthState = {
  cartItems: {}
}

function Cart(state = initialAuthState, action) {
  switch(action.type) {
    case CartConstants.ADD_ITEM_CART: {
      const { cartItems } = state
      const copyCartItems = {...cartItems}
      const { item } = action.payload
      const isItemAlreadyExists = cartItems[item.id]
      
      let copyItem = {...item}
      
      if(isItemAlreadyExists) {
        copyItem = {...cartItems[item.id]}
        copyItem.quantity += 1
        copyCartItems[item.id] = copyItem
      }
      else {
        copyItem.quantity = 1
        copyCartItems[item.id] = copyItem
      }
      return {
        ...state,
        cartItems: copyCartItems
      }
    }
    case CartConstants.REMOVE_ITEM_CART: {
      const { cartItems } = state
      const copyCartItems = {...cartItems}
      const { id, all, removeCurrent } = action.payload
      const isItemAlreadyExists = copyCartItems[id]
      if(!isItemAlreadyExists) {
        return state
      }
      if(removeCurrent) {
        delete copyCartItems[id]
        return {
          ...state,
          cartItems: copyCartItems
        }
      }
      if(all) {
        return {
          ...state,
          cartItems: {},
        }
      }
      if(isItemAlreadyExists) {
        let copyItem = {...isItemAlreadyExists}
        if(copyItem.quantity === 1) {
          delete copyCartItems[id]
          return {
            ...state,
            cartItems: copyCartItems,
          }
        }
        copyItem.quantity -= 1
        copyCartItems[id] = copyItem
        return {
          ...state,
          cartItems: copyCartItems
        }
      } 

    }
    break
    default:
      return state
  }
}


export default Cart