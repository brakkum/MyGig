import React from "react";
import ReactDOM from "react-dom";
import UserNamePopup from "./UserNamePopup";

export default class UserNameDisplay extends React.Component {
    // Used when username is rendered
    // includes UserNamePopup
    // with shortcut for user connection

    // initial state
    state = {
        showPopup: false,
        location: null,
        popupTop: null,
        popupLeft: null,
        popupWidth: null
    };

    memberStyle = {
        margin: "10px"
    };

    handleMouseOver = () => {
        this.setState({
           showPopup: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
           showPopup: false
        });
    };

    // on page resize, update location for popup placement
    updateLocation = () => {
        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({
            location: rect,
            popupTop: rect.bottom,
            popupLeft: rect.left,
            popupWidth: rect.width
        });
    };

    componentWillUnmount() {
        // remove listener
        window.removeEventListener("resize", this.updateLocation);
    }

    componentDidMount() {
        // get initial location
        this.updateLocation();
        // listen for window resizes
        window.addEventListener("resize", this.updateLocation);
    }

    render() {
        return(
            <span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                {/* member name */}
                <span style={this.memberStyle}>
                    {
                        this.props.memberData.name
                    }
                </span>
                {/* popup for user being hovered over */}
                <UserNamePopup
                    showPopup={this.state.showPopup}
                    width={this.state.popupWidth}
                    top={this.state.popupTop}
                    left={this.state.popupLeft}
                    memberData={this.props.memberData}
                />
            </span>
        )
    }
}
