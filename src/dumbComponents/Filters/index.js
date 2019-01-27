import React from "react";
import Container from "components/Results";
import { discountRange } from "components/Results/consts";
import throttle from "lodash/throttle";
import "./styles.css";

class Filters extends React.Component {
  state = {
    rangeValue: 0,
    oldRangeValue: 0
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!state.rangeValue && props.max) {
      return {
        rangeValue: props.max || 0,
        oldRangeValue: state.rangeValue
      };
    }
    return null;
  };

  changeInDiscount = (e, infoObj) => {
    const { setFilter, removeFilter } = this.props;
    if (e.target.checked) {
      setFilter("discount", infoObj.value);
    }
    if (!e.target.checked) {
      removeFilter("discount", infoObj.value);
    }
  };
  changeValue = (e, type) => {
    const { setFilter } = this.props;
    const rangeValue = parseInt(e.currentTarget.value, 10);
    this.setState({
      rangeValue
    });
    if (type === "from") {
      if (e.target) {
        setFilter("price", e.target.value);
      }
    }
  };
  changeBrand = (e, brand) => {
    const { setFilter, removeFilter } = this.props;
    if (e.target.checked) {
      setFilter("brand", brand);
    } else {
      removeFilter("brand", brand);
    }
  };
  onclickCross = () => {
    const { changeFilterShowStatus } = this.props
    changeFilterShowStatus(false)
  }

  render() {
    const {
      uniqueBrands,
      max,
      min,
      filter,
      objectFormatFilters,
      isAdaptive
    } = this.props;
    const { rangeValue } = this.state;
    return (
      <div className="result-filter">
        <h3>Filters</h3>
        <span onClick={this.onclickCross} className="cross-btn">X</span>
        <div className="discount-section">
          <p className="section-head">DISCOUNT</p>
          {discountRange &&
            discountRange.map((element, index) => {
              const { discount } = objectFormatFilters;
              const isChecked = discount[element.value];
              return (
                <div className="checkbox-row" key={index}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    htmlFor={element.text}
                    onChange={e => {
                      this.changeInDiscount(e, element);
                    }}
                  />
                  <label id={element.text}>{element.text}</label>
                </div>
              );
            })}
        </div>
        <div className="price-section">
          <p className="section-head">PRICE</p>
          <div className="slider-input">
            <label> Upto Rs {rangeValue}</label>
            <input
              type="range"
              name="quantity"
              min={min}
              max={max}
              // defaultValue={rangeValue}
              value={rangeValue}
              onChange={() => {}}
              onInput={throttle(e => this.changeValue(e, "from"), 1000, {
                trailing: true
              })}
            />
          </div>
        </div>
        <div className="brand-section">
          <p className="section-head">BRAND</p>
          {uniqueBrands &&
            uniqueBrands.map(element => {
              const { p_brand } = element;
              const isSelected = objectFormatFilters.brands[p_brand];
              return (
                <div className="checkbox-row" key={p_brand}>
                  <input
                    type="checkbox"
                    htmlFor={p_brand}
                    checked={isSelected}
                    onChange={e => {
                      e.persist();
                      this.changeBrand(e, p_brand);
                    }}
                  />
                  <label id={p_brand}>{p_brand}</label>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Container(Filters);
