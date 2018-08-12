import * as ResultsConstants from "./consts"
import Cookies from "js-cookie"

const getItemRequest = () => ({
  type: ResultsConstants.GET_ITEMS_REQUEST,
})

const getItemSuccess = (payload) => ({
  type: ResultsConstants.GET_ITEMS_SUCCESS,
  payload,
})

const getItemFailure = () => ({
  type: ResultsConstants.GET_ITEMS_FAILURE,
})

const setSortBy = (sortType) => ({
  type: ResultsConstants.SET_SORT_TYPE,
  sortType,
})

const setFilter = (filterType, value) => {
  return {
    type: ResultsConstants.SET_FILTER,
    filterType,
    value
  }
}

const removeFilter = (filterType, value) => {
  return {
    type: ResultsConstants.REMOVE_FILTER,
    filterType,
    value
  }
}
const getItems = (payload) => {
  return (dispatch) => {
    dispatch(getItemRequest())
    fetch("https://demo7556614.mockable.io/get-items")
      .then((result) => {
        return result.json()
      })
      .then((itemResult) => {
        dispatch(getItemSuccess(itemResult))
      })
      .catch((e) => {
        dispatch(getItemFailure())
      })
  }
}
export {
  getItemRequest,
  getItemSuccess,
  getItemFailure,
  getItems,
  setSortBy,
  setFilter,
  removeFilter,
}