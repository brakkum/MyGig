import React from "react";

export default class Button extends React.Component {
    // Button component for executing
    // api calls or methods on click
    // props:
    // onClick: what to execute on click
    // sendingRequest: if true, component updates
    // preClickText: button display text
    // type: string, type of button, ie success, danger

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

    defaultButtonColor = "whitesmoke";

    render() {
        let hovered = this.state.hovered;
        let clicked = this.state.clicked;
        let type = this.props.type || "neutral";
        return(
            <button
                onClick={this.props.onClick}
                style={{
                    backgroundColor: clicked ? this.clickColors[type] : hovered ? this.hoverColors[type] : this.defaultButtonColor,
                    border: "none",
                    outline: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    transition: ".2s",
                    cursor: "pointer",
                    margin: "10px"
                }}
                onMouseOver={this.mouseOverButton}
                onMouseLeave={this.mouseLeaveButton}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
            >
                {
                    this.props.sendingRequest ? "One moment.." : this.props.preClickText || "Click"
                }
            </button>
        )
    }
}
