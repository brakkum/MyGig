import React from "react";

export default class Popup extends React.Component {

    popupHidden = {
        width: "0px",
        height: "0px",
    };

    popupShown = {
        height: this.props.width || "100px",
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
