import React from "react";
import Container from "components/Results";
import Item from "dumbComponents/Item";
import Preference from "dumbComponents/Preference";
import Filters from "dumbComponents/Filters";
import Capsuletab from "dumbComponents/Common/CapsuleTab";
import "./styles.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.state = {
      options: [{ name: "" }],
      isVisiblePage: true,
      pictureInPictureMode: false
    };
  }
  pictureInPictureLogic = () => {
    if (document.pictureInPictureEnabled) {
      const { pictureInPictureMode } = this.state;
      if (pictureInPictureMode) {
        document
          .exitPictureInPicture()
          .then(() => {
            /**/
            this.setState({
              pictureInPictureMode: false
            });
          })
          .catch(e => {
            /**/
          });
      } else {
        const elem = document.getElementById("video-demo");
        elem
          .requestPictureInPicture()
          .then(() => {
            /**/
            this.setState({
              pictureInPictureMode: true
            });
          })
          .catch(e => {
            /**/
            // console.log("e *****", e);
          });
      }
    }
  };
  onTabVisibilityChange = e => {
    if (e.target.visibilityState === "hidden") {
      this.setState({
        isVisiblePage: false
      });
    }
    if (e.target.visibilityState === "visible") {
      this.setState({
        isVisiblePage: true
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // const { isPlaying, isVisiblePage } = this.state;
    // const {
    //   isPlaying: previsPlaying,
    //   isVisiblePage: previsVisiblePage
    // } = prevState;
    // if (!isVisiblePage && previsVisiblePage && isPlaying) {
    //   console.log("now calling pictureInPictureLogic");
    //   //this.pictureInPictureLogic();
    // }
  }
  componentDidMount() {
    const { getItems } = this.props;
    getItems();
    document.addEventListener("visibilitychange", this.onTabVisibilityChange);
    this.video.current.onplaying = () => {
      this.setState({
        isPlaying: true
      });
    };
    this.video.current.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };
    this.video.current.addEventListener("enterpictureinpicture", () => {
      //can identify when user entered this mode
    });
    this.video.current.addEventListener("leavepictureinpicture", () => {
      this.setState({
        pictureInPictureMode: false
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener(
      "visibilitychange",
      this.onTabVisibilityChange
    );
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
  changeBackground = timeOfDay => {
    const resultContainer = document.getElementsByClassName(
      "result-container"
    )[0];
    if (timeOfDay === "morning") {
      resultContainer.style.background = "#fff";
    } else {
      resultContainer.style.background = "#262c36";
    }
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
    const isPipEnabled = document.pictureInPictureEnabled;
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
          <div className="right-panel">
            <div className="action-layer-1">
              <Capsuletab callBack={this.changeBackground} />
              {isPipEnabled && (
                <button
                  className="toggle-pip"
                  onClick={this.pictureInPictureLogic}
                >
                  Toggle PIP
                </button>
              )}
            </div>
            <video
              ref={this.video}
              id="video-demo"
              src="https://cdn.arnellebalane.com/videos/original-video.mp4"
              autoPlay
              muted
              controls
            />
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
                      isAdaptive={isAdaptive}
                    />
                  );
                })}
              {(!items || items.length === 0) && "Loading the results"}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Container(Results);
