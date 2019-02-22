import React from "react";

export default class Modal extends React.Component {

    modalHidden = {
        height: "0px",
    };

    modalShown = {
        height: this.props.height || "100px"
    };

    modalDefaultStyle = {
        position: "absolute",
        // backgroundColor: "red",
        border: "1px solid red",
        justifyContent: "center",
    };

    transitionStyle = {
        transition: "height 1s",
    };

    containerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden"
    };

    render() {
        let shownStyle = this.props.showModal ? this.modalShown : this.modalHidden;
        return(
            <div style=
                {{
                    ...this.modalDefaultStyle,
                    ...shownStyle,
                    ...this.transitionStyle,
                    top: (this.props.top || (window.innerWidth / 50)) + "px",
                    left: (this.props.left || window.innerWidth - (window.innerWidth / 10)) + "px",
                    width: (this.props.width + "px" || "500px")
                }}
            >
                <div style={{...this.containerStyle, ...shownStyle, ...this.transitionStyle}}>
                {
                    this.props.interior
                }
                </div>
            </div>
        )
    }
}
