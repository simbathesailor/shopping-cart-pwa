import React from "react";
import Container from "components/Results";
import Item from "dumbComponents/Item";
import Preference from "dumbComponents/Preference";
import Filters from "dumbComponents/Filters";
import "./styles.css";

class Results extends React.Component {
  state = {
    options: [{ name: "" }]
  };

  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  onDrop = ev => {
    ev.preventDefault();
    const { removeItemFromCart } = this.props;
    let data = {};
    try {
      data = JSON.parse(ev.dataTransfer.getData("text"));
    } catch (e) {
      return;
    }
    removeItemFromCart(data.sku, false, true);
  };

  render() {
    const {
      isAdaptive,
      changeFilterShowStatus,
      shouldShowFilter,
      filter,
      objectFormatFilters
    } = this.props;
    const {
      items,
      addItemToCart,
      removeItemFromCart,
      cartItems,
      setSortBy
    } = this.props;
    let showFilter = false;
    if (isAdaptive && shouldShowFilter) {
      showFilter = true;
    }
    if (!isAdaptive) {
      showFilter = true;
    }
    return (
      <div className="result-container">
        {/* <Preference setSortBy={setSortBy} /> */}
        <div className="results-main">
          {showFilter && (
            <Filters
              changeFilterShowStatus={changeFilterShowStatus}
              isAdaptive={isAdaptive}
            />
          )}
          <ul
            className="items-container"
            onDragOver={ev => {
              ev.preventDefault();
            }}
            onDragEnter={ev => {
              ev.preventDefault();
            }}
            onDrop={this.onDrop}
          >
            {items &&
              items.map(item => {
                return (
                  <Item
                    item={item}
                    key={item.sku}
                    addItemToCart={addItemToCart}
                    removeItemFromCart={removeItemFromCart}
                    cartItems={cartItems}
                  />
                );
              })}
            {(!items || items.length === 0) && "Loading the results"}
          </ul>
        </div>
      </div>
    );
  }
}

export default Container(Results);
