import React from "react";
import Container from "components/Cart";
import { withRouter } from "react-router";
import onClickOutside from "react-onclickoutside";
import "./styles.css";

class Cart extends React.Component {
  state = {
    isVisibleList: false
  };

  changeVisibilityList = () => {
    this.setState({
      isVisibleList: !this.state.isVisibleList
    });
  };
  drag = (ev, item) => {
    ev.dataTransfer.setData("text", JSON.stringify(item));
  };
  onDrop = ev => {
    ev.preventDefault();
    const { addItemToCart } = this.props;
    let data = {};
    try {
      data = JSON.parse(ev.dataTransfer.getData("text"));
    } catch (e) {
      return;
    }
    addItemToCart(data);
  };
  onClickCross = id => {
    const { removeItemFromCart } = this.props;
    removeItemFromCart(id, false, true);
  };
  goToCheckout = () => {
    const { cartTotal, history, cartItems } = this.props;
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("cartTotal", JSON.stringify({ cartTotal }));
    if (cartTotal) {
      history.push("/checkout");
    }
  };

  handleClickOutside = () => {
    this.setState({
      isVisibleList: false
    });
  };
  render() {
    const { cartItemsCount, cartItems, cartTotal } = this.props;
    const { isVisibleList } = this.state;
    return (
      <div className="cart-main-container">
        <div
          className="cart-container"
          onDrop={this.onDrop}
          onDragOver={ev => {
            ev.preventDefault();
          }}
          onDragEnter={ev => {
            ev.preventDefault();
          }}
        >
          <div className="cart" onClick={this.changeVisibilityList} />
          <div onClick={this.changeVisibilityList}>
            <p>My Basket</p>
            <p>{cartItemsCount} Items</p>
          </div>
        </div>
        {isVisibleList && (
          <div className="cart-expand">
            <ul className="list-container">
              {cartItems &&
                Object.keys(cartItems).map(id => {
                  const item = cartItems[id];
                  const { p_img_url, p_brand, p_desc, sku } = item;
                  return (
                    <li
                      key={sku}
                      className="item-row"
                      draggable
                      onDragStart={ev => this.drag(ev, item)}
                    >
                      <img
                        className="img-it-row"
                        src={p_img_url}
                        alt="itemimg"
                      />
                      <div className="info-sec">
                        <p className="brand">{p_brand}</p>
                        <p className="desc">{p_desc}</p>
                      </div>
                      <div>Rs {item.mrp}</div>
                      <div className="quantity">{item.quantity}</div>
                      <div
                        className="remove"
                        onClick={() => {
                          this.onClickCross(sku);
                        }}
                      >
                        X
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="total-section">
              <div className="sub-total">Sub Total: Rs {cartTotal}</div>
              <button className="checkout-btn" onClick={this.goToCheckout}>
                View Basket & Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Container(withRouter(onClickOutside(Cart)));
