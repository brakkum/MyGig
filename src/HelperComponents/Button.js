import React from "react";

export default class Button extends React.Component {
    // Button component for executing
    // api calls or methods on click
    // props:
    // onClick: what to execute on click
    // sendingRequest: if true, component updates
    // preClickText: button display text

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
            hovered: false
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

    render() {
        let hovered = this.state.hovered;
        let clicked = this.state.clicked;
        return(
            <button
                onClick={this.props.onClick}
                style={{
                    backgroundColor: clicked ? "lawngreen" : hovered ? "lightgreen" : "whitesmoke",
                    border: clicked ? "2px solid royalblue" : "none",
                    outline: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    transition: ".2s",
                    cursor: "pointer"
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
