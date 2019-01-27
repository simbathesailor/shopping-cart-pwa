import React from "react";
import classNames from "classnames";
import { displayNotification } from "sw/notification";

class Item extends React.Component {
  onClickPlus = item => {
    const { addItemToCart } = this.props;
    displayNotification();
    addItemToCart(item);
  };

  onClickMinus = id => {
    const { removeItemFromCart } = this.props;
    removeItemFromCart(id, false);
  };
  drag = ev => {
    console.log("dragging");
    const { item } = this.props;
    ev.dataTransfer.setData("text", JSON.stringify(item));
  };
  shareLogic = () => {
    if (navigator.share) {
      // we can use web share!
      navigator
        .share({
          title: "PWA shopping cart",
          text: "PWA-X",
          url: window.location.href
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(err => {
          console.log(`Couldn't share because of`, err.message);
        });
    } else {
      // provide a fallback here
      console.log("web share not supported");
    }
  };
  render() {
    const { item, cartItems, isAdaptive } = this.props;
    const iteminCart = cartItems[item.sku];
    const classItem = classNames("item", {
      "color-selected": iteminCart && iteminCart.quantity
    });

    return (
      <ul
        className={classItem}
        draggable={true}
        onDragOver={ev => {
          ev.preventDefault();
        }}
        onDragEnter={ev => {
          ev.preventDefault();
        }}
        onDragStart={ev => this.drag(ev)}
      >
        <div
          className="img-container"
          style={{
            backgroundImage: `url(${item.p_img_url})`
          }}
        >
          {/* <img src={item.p_img_url} alt="noimg"/> */}
        </div>
        <p className="brand">{item.p_brand}</p>
        <p className="desc">{item.p_desc}</p>
        {isAdaptive && navigator.share && <i className="fas fa-share-alt" onClick={this.shareLogic} />}
        <li className="mrp-section">
          <p className="price-section">
            MRP&nbsp;:&nbsp;
            {item.dis_val && <span className="disc-price">Rs {item.mrp}</span>}
            <span className="org-price">{item.sp}</span>
          </p>
          <p className="add-item-section">
            <span
              className="act-btn"
              onClick={() => this.onClickMinus(item.sku)}
            >
              -
            </span>
            <span className="quantity-sec">
              {iteminCart ? iteminCart.quantity : 0}
            </span>
            <span className="act-btn" onClick={() => this.onClickPlus(item)}>
              +
            </span>
          </p>
        </li>
      </ul>
    );
  }
}

export default Item;
