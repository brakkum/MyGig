import React from "react";

export default class UserPicture extends React.Component {
    // displays users picture, or default
    // TODO: have actual default image
    // props:
    // color: background color if no photoUrl
    // photoUrl: url for photo to display
    // innerHtml: text to show on hover, defaults null
    // highlightOnHover: surround pic with border on hover
    // highlightColor: color to use if highlighting

    state = {
        username: null,
        hovered: false,
        innerHtml: null,
        color: this.props.color || "azure",
        photoUrl: this.props.photoUrl
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
        backgroundImage: `url(${this.props.photoUrl})`,
        backgroundSize: "150% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    };

    hoverStyle = {
        // if highlight on hover, but no color provided, default royalblue
        boxShadow: "0 0 0 3pt " + (this.props.highlightColor || "royalblue")
    };

    handleHover = () => {
        this.setState({ hovered: true, innerHtml: this.props.innerHtml || null });
    };

    handleLeave = () => {
        this.setState({ hovered: false, innerHtml: null });
    };

    render() {
        // use pic as background if supplied
        let includePic = this.props.photoUrl ? this.hasPicStyle : {};
        // is it hovered, and should it be highlighted
        let hoveredStyle = (this.state.hovered && this.props.highlightOnHover) ? this.hoverStyle : {};
        return(
            <div
                style={{...this.baseStyle, ...includePic, ...hoveredStyle}}
                onClick={this.props.onClick}
                onMouseOver={this.handleHover}
                onMouseOut={this.handleLeave}
            >
                {
                    // innerHtml displayed on hover
                    // if provided
                    this.state.innerHtml
                }
            </div>
        )
    }
}
