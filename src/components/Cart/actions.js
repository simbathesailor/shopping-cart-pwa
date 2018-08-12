import * as CartConstants from "./consts"

const addItemToCart = (item) => {
  const { sku } = item
  return {
    type: CartConstants.ADD_ITEM_CART,
    payload: {
      item : {
        ...item,
        id: sku
      }
    }
  }
}

const removeItemFromCart = (id, all, removeCurrent) => ({
  type: CartConstants.REMOVE_ITEM_CART,
  payload: {
    id,
    all,
    removeCurrent,
  },
})

export {
  addItemToCart,
  removeItemFromCart,
}