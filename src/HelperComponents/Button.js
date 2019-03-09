import React from "react";

export default class Button extends React.Component {
    // Button component for executing
    // api calls or methods on click
    // props:
    // onClick: what to execute on click
    // sendingRequest: if true, component updates
    // preClickText: button display text
    // type: string, type of button, ie success, danger
    // postClickText: string to be displayed after click
    // style: added style, ie for floats
    // size: sm, md, lg

    state = {
        hovered: false,
        clicked: false
    };

    mouseOverButton = () => {
        this.setState({
            hovered: true
        });
    };

    mouseLeaveButton = () => {
        this.setState({
            hovered: false,
            clicked: false
        });
    };

    mouseDown = () => {
        this.setState({
            clicked: true
        });
    };

    mouseUp = () => {
        this.setState({
            clicked: false
        });
    };

    hoverColors = {
        "neutral": "#e5edf9",
        "success": "#dbf7d9",
        "danger": "#fcb0ba",
    };

    clickColors = {
        "neutral": "#d6e5fc",
        "success": "#b1f7ad",
        "danger": "#ff919f",
    };

    btnPadding = {
        "sm": "3px 5px",
        "md": "5px 10px",
        "lg": "8px 13px"
    };

    btnFontSize = {
        "sm": "11px",
        "md": "12px",
        "lg": "15px"
    };

    defaultButtonColor = "transparent";

    render() {
        let hovered = this.state.hovered;
        let clicked = this.state.clicked;
        let type = this.props.type || "neutral";
        let size = this.props.size || "md";
        return(
            <button
                onClick={this.props.onClick}
                style={{
                    backgroundColor: clicked ? this.clickColors[type] : hovered ? this.hoverColors[type] : this.defaultButtonColor,
                    border: "none",
                    outline: "none",
                    boxShadow: "0 0 2pt black",
                    outlineRadius: "4px",
                    borderRadius: "4px",
                    padding: this.btnPadding[size],
                    fontSize: this.btnFontSize[size],
                    transition: ".2s",
                    cursor: "pointer",
                    margin: "10px",
                    ...this.props.style
                }}
                onMouseOver={this.mouseOverButton}
                onMouseLeave={this.mouseLeaveButton}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
            >
                {
                    this.props.sendingRequest ? (this.props.postClickText || "One moment..") : this.props.innerText || "Click"
                }
            </button>
        )
    }
}
