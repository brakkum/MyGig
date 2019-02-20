import React from "react";

export default class UserPicture extends React.Component {

    state = {
        picUrl: this.props.picUrl,
        username: null,
        hovered: false,
        innerHtml: null,
        color: this.props.color || "azure"
    };

    baseStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        backgroundColor: "lightblue",
        transition: ".3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        cursor: "pointer",
        boxShadow: "0 0 1pt transparent",
        color: this.state.color,
        textShadow: "1px 1px black"
    };

    hasPicStyle = {
        backgroundImage: `url(${this.state.picUrl})`,
        backgroundSize: "150% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    };

    hoverStyle = {
        boxShadow: "0 0 0 3pt royalblue"
    };

    handleHover = () => {
        this.setState({ hovered: true, innerHtml: this.props.innerHtml || "edit" });
    };

    handleLeave = () => {
        this.setState({ hovered: false, innerHtml: "" });
    };

    render() {
        let includePic = this.state.picUrl ? this.hasPicStyle : {};
        let hoveredStyle = this.state.hovered ? this.hoverStyle : {};
        return(
            <div
                style={{...this.baseStyle, ...includePic, ...hoveredStyle}}
                onClick={this.props.onClick}
                onMouseOver={this.handleHover}
                onMouseOut={this.handleLeave}
            >
                {
                    this.state.innerHtml
                }
            </div>
        )
    }
}
