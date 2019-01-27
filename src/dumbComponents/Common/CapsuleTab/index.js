import React from "react";
import "./styles.css";

class Capsuletab extends React.Component {
  constructor(props) {
    super(props);
    this.capsuleContainer = React.createRef();
    this.circleTab = React.createRef();
  }
  componentDidMount() {}
  toggleTab = () => {
    const { callBack } = this.props
    const circleElement = this.circleTab.current
    const isMorning = circleElement.classList.value.includes(" morning");

    if (isMorning) {
      if(callBack) {
        callBack("morning")
      }
      
      circleElement.classList.remove("morning");
      circleElement.classList.add("night");
    } else {
      if(callBack) {
        callBack("night")
      }
      circleElement.classList.remove("night");
      circleElement.classList.add("morning");
    }
  };
  render() {
    return (
      <div
        ref={this.capsuleContainer}
        onClick={this.toggleTab}
        className="capsule-container"
      >
        <div ref={this.circleTab} className="circle morning" />
        <i className="fas fa-sun" />
        <i className="fas fa-moon" />
      </div>
    );
  }
}

export default Capsuletab
