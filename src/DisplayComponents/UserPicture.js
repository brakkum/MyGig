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
        transition: ".2s"
    };

    hasPic = {
        backgroundImage: this.state.pic_url,
    };

    hoverStyle = {
        backgroundColor: "lightgrey",

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
                className="user-pic"
                style={{...this.baseStyle, ...includePic, ...hoveredStyle}}
                onClick={this.handleClick}
                onMouseEnter={this.handleHover}
                onMouseOut={this.handleLeave}
            >

            </div>
        )
    }
}
