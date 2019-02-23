import React from "react";

export default class Popup extends React.Component {
    // Popup that can appear below components
    // TODO: styling
    // props
    // showPopup: boolean
    // width: popup width
    // top: how far from top of window to appear
    // left: how far from left of window to appear
    // memberData: memberData object for displayed user

    popupHidden = {
        width: "0px",
        height: "0px",
    };

    popupShown = {
        // how tall is popup on show
        height: this.props.width || "100px",
        // how wide is popup on show
        width: this.props.width || "100px"
    };

    containerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden",
    };

    popupDefaultStyle = {
        position: "absolute",
        // backgroundColor: "red",
        // border: "1px solid red",
        justifyContent: "center",
    };

    transitionStyle = {
        transition: "all 1s",
    };

    render() {
        // props.showPopup decides when to show popup
        // what style to be include on show/hide
        let popupStyle = this.props.showPopup ? this.popupShown : this.popupHidden;
        return(
            <div style={{
                ...this.popupDefaultStyle,
                ...this.transitionStyle,
                ...popupStyle,
                top: this.props.top + "px",
                left: this.props.left + "px"
            }}>
                <div style={this.containerStyle}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}
