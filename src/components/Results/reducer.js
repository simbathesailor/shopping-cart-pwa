import * as ResultsConstants from "./consts"

const initialAuthState = {
  user : null,
  isLoggedIn: false,
  isFetching: false,
  isFetched: false,
  isFailure: false,
  data: [],
  sortBy: "relevance",
  filter: {
    price: 0,
    discount: [],
    brand: []
  }
}


function Results(state = initialAuthState, action) {
  switch(action.type) {
    case ResultsConstants.GET_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      }
    case ResultsConstants.GET_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: false,
        data: action.payload,
      }
    case ResultsConstants.GET_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: true,
    }
    case ResultsConstants.SET_SORT_TYPE:
      return {
        ...state,
        sortBy: action.sortType,
      }
    case ResultsConstants.SET_FILTER: {
      const { filterType, value } = action
      switch(filterType) {
        case "price": 
          return {
            ...state,
            filter: {
              ...state.filter,
              price: value
            }
          }
        case "discount": {

          return {
            ...state,
            filter: {
              ...state.filter,
              discount: [...state.filter.discount, value]
            }
          }
        }
        case "brand":
        return {
          ...state,
          filter: {
            ...state.filter,
            brand: [...state.filter.brand, value]
          }
        }
        default:
          return state
      }
    }
    case ResultsConstants.REMOVE_FILTER: {
      const { filterType, value } = action
      switch(filterType) {
        case "price": 
          return {
            ...state,
            filter: {
              ...state.filter,
              price: {from: value.from, to: value.to}
            }
          }
        case "discount": {
          // const { setFilter, removeFilter } = this.props
          const indexDiscount = state.filter.discount.findIndex((element) => {
            return element === value
          })
          const discountCopy =  [...state.filter.discount]
          if(indexDiscount !== -1) {
            discountCopy.splice(indexDiscount, 1)
          }
          return {
            ...state,
            filter: {
              ...state.filter,
              discount: discountCopy,
            }
          }
        }
        case "brand": {
          const indexBrand = state.filter.brand.findIndex((element) => {
            return element === value
          })
          const brandCopy =  [...state.filter.brand]
          if(indexBrand !== -1) {
            brandCopy.splice(indexBrand, 1)
          }
          return {
            ...state,
            filter: {
              ...state.filter,
              brand: brandCopy
            }
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}


export default Results