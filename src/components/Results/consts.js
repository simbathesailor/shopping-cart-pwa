const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST"
const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS"
const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE"
const SET_SORT_TYPE = "SET_SORT_TYPE"
const SET_FILTER = "SET_FILTER"
const REMOVE_FILTER = "REMOVE_FILTER"

const PreferenceMap = {
  relevance: "Relevance",
  priceLtoH: "Price Low to High",
  priceHtoL: "Price High to Low",
  savingHtoL: "Savings High to Low",
  savingLtoH: "Savings Low to High",
}

const discountRange = [
  {
    text : "More than 10%",
    value: 10,
    lessThan: false,
  },
  {
    text : "More than 20 %",
    value: 20,
    lessThan: false,
  }
]

export {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE, 
  SET_SORT_TYPE,
  REMOVE_FILTER,
  SET_FILTER,
  PreferenceMap,
  discountRange,
}
