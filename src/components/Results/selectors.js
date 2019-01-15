import { createSelector } from "reselect"
import uniqBy from "lodash/uniqBy"



const itemSelector = (results) => results.data.prods

const preferenceSelecor = (results) => results.sortBy

const filterPrice = (results) => parseInt(results.filter.price, 10)

const filterDiscount = (results) => results.filter.discount

const filterBrand = (results) => results.filter.brand


const sortItemListPrice = (itemsList, direction, field) => {
  if(direction === "ASC") {
    return itemsList.sort((a, b) => {
      if(parseInt(a[field], 10) > parseInt(b[field], 10)) {
        return 1
      }
      if(parseInt(a[field], 10) < parseInt(b[field], 10)) {
        return -1
      }
      return 0
    })
  }
  if(direction === "DESC") {
    return itemsList.sort((a, b) => {
      if(parseInt(a[field], 10) < parseInt(b[field], 10)) {
        return 1
      }
      if(parseInt(a[field], 10) > parseInt(b[field], 10)) {
        return -1
      }
      return 0
    })
  }
}
const passThroughPreference = (preference, itemsList) => {
  const copyItems = itemsList ? [...itemsList]: []
  switch(preference) {
    case "relevance":
      return copyItems
    case "priceLtoH":
      return sortItemListPrice(copyItems, "ASC", "sp")
    case "priceHtoL":
      return sortItemListPrice(copyItems, "DESC", "sp")
    case "savingHtoL": {
      const ruppeSavingArr = copyItems.map((item) => {
        return {
          ...item,
          savings: parseInt(item.mrp, 10) - parseInt(item.sp, 10),
        }
      })
      return sortItemListPrice(ruppeSavingArr, "DESC", "savings")
    }
    default:
    return copyItems
  }
}


const getFilteredResults = createSelector(
    itemSelector,
    preferenceSelecor,
    filterPrice,
    filterDiscount,
    filterBrand,
    (rawResults, preference, priceFilter, discountFilter, brandFilter) => {
      let finalResult = rawResults
      if(brandFilter.length !== 0) {
        const brandFiltered = finalResult.filter((element) => {
          return brandFilter.indexOf(element.p_brand) !== -1
        })
        finalResult = brandFiltered
      }
      if(priceFilter !== 0) {
        const priceFiltered = finalResult.filter((element) => {
          return element.sp <= priceFilter
        })
        finalResult = priceFiltered
      }
      if(discountFilter.length !== 0) {
        const discountFiltered = finalResult.filter((element) => {
          const {dis_val, dis_t } = element
          if(dis_t!== "P") {
            return true
          }
          const min = Math.min(...discountFilter)
          if(parseInt(dis_val, 10) > min) {
            return true
          }
          return false
        })
        finalResult = discountFiltered
      }
      return passThroughPreference(preference, finalResult)
    }
)

const getUniqueBrands = createSelector(
    itemSelector,
    (items) => {
        return uniqBy(items, (item) => {
            return item.p_brand
        })
    }
)

const getMaxMinPrice = createSelector(
  itemSelector,
  (items) => {
    let max = null
    let min = null
    if(!items) return {max, min}
    items.forEach((element) => {
      const price = parseInt(element.mrp, 10)
      if(!max) {
        max = price
      } else if(price > max) {
        max = price
      }
      if(!min) {
        min=price
      } else if(price < min) {
        min = price
      }
    })
    return {max , min}
  }
)
const getFilter = state => state.results.filter
const convertToObjFilterObj = createSelector(
  getFilter,
  (filter) => {
    const { brand, discount } = filter
    const brandEnhanced = brand.reduce((acc, elem) => {
      acc[elem] = true
      return acc
    }, {})
    //discount
    const discountEnhanced = discount.reduce((acc, elem) => {
      acc[elem] = true
      return acc
    }, {})
    return {
      brands : brandEnhanced,
      discount: discountEnhanced
    }
  }
)
export {
    getFilteredResults,
    getUniqueBrands,
    getMaxMinPrice,
    convertToObjFilterObj,
}