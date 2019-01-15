import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ResultActions from "./actions";
import * as CartActions from "components/Cart/actions";
import {
  getFilteredResults,
  getUniqueBrands,
  getMaxMinPrice,
  convertToObjFilterObj
} from "components/Results/selectors";

function mapStateToProps(state) {
  const { cartItems } = state.cart;
  const results = getFilteredResults(state.results);
  const uniqueBrands = getUniqueBrands(state.results);
  const { max, min } = getMaxMinPrice(state.results);
  const { filter } = state.results;
  const objectFormatFilters = convertToObjFilterObj(state)
  return {
    items: results,
    cartItems,
    uniqueBrands,
    max,
    min,
    filter,
    objectFormatFilters,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ResultActions,
      ...CartActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
