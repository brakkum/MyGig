import React from "react";

export default class UserPicture extends React.Component {

    state = {
        pic_url: null,
        user_name: null,
        hovered: false
    };

    baseStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        backgroundColor: "lightblue",
        transition: ".2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        cursor: "pointer",
        border: "2px solid transparent"
    };

    hasPic = {
        backgroundImage: this.state.pic_url,
    };

    hoverStyle = {
        border: "2px solid royalblue",
    };

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    handleHover = () => {
        this.setState({ hovered: true });
    };

    handleLeave = () => {
        this.setState({ hovered: false });
    };

    render() {
        let includePic = this.state.pic_url ? this.hasPic : {};
        let hoveredStyle = this.state.hovered ? this.hoverStyle : {} ;
        return(
            <div
                style={{...this.baseStyle, ...includePic, ...hoveredStyle}}
                onClick={this.handleClick}
                onMouseOver={this.handleHover}
                onMouseOut={this.handleLeave}
            />
        )
    }
}
