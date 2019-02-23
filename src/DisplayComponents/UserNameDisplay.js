import React from "react";
import ReactDOM from "react-dom";
import UserNamePopup from "./UserNamePopup";

export default class UserNameDisplay extends React.Component {

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
        window.removeEventListener("resize", this.updateLocation);
    }

    componentDidMount() {
        this.updateLocation();
        window.addEventListener("resize", this.updateLocation);
    }

    render() {
        return(
            <span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <span style={this.memberStyle}>
                    {
                        this.props.memberData.name
                    }
                </span>
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
