import React from "react"
import "./styles.css"

class UserForm extends React.Component {
  render() {
    return (
      <div class="userinfo-container">
          <div className="label-part">
            <label>Name:</label>
            <label>Email Id:</label>
            <label>Phone:</label>
            <label>Address:</label>
          </div>
          <div className="input-part">
            <input placeholder="name" type="text"/>
            <input placeholder="email" type="text"/>
            <input placeholder="phone" type="text"/>
            <input type="text" placeholder="Shipping address"/>
        </div>
      </div>
    )
  }
}

export default UserForm