import React from "react";
import Container from "components/Cart";
import UserForm from "dumbComponents/UserForm";
import "./styles.css";

class Checkout extends React.Component {
  render() {
    const { cartItems, cartTotal } = this.props;
    return (
      <div className="checkout-container">
        <h3>Checkout page</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ITEM DESCRIPTION</th>
                <th>UNIT PRICE</th>
                <th>QUANTITY</th>
                <th>SAVINGS</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                Object.keys(cartItems).map(id => {
                  const item = cartItems[id];
                  const { p_desc, sp, quantity, mrp } = item;
                  const savings = parseInt(mrp, 10) - parseInt(sp, 10);
                  return (
                    <tr>
                      <td>{p_desc}</td>
                      <td>Rs {sp}</td>
                      <td>{quantity}</td>
                      <td>{savings ? savings : ""}</td>
                    </tr>
                  );
                })}
              <tr className="total-row">
                <td colSpan="1" />
                <td colSpan="3">Total Amout: Rs {cartTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <UserForm cartTotal={cartTotal} />
        <button className="pay-btn">PAY &#8377; {cartTotal}</button>
      </div>
    );
  }
}

export default Container(Checkout);
