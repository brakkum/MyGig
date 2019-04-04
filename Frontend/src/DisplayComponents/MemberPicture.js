import React from "react";

export default class MemberPicture extends React.Component {
    // displays users picture, or default
    // TODO: have actual default image
    // props:
    // color: background color if no photoUrl
    // photoUrl: url for photo to display
    // innerHtml: text to show on hover, defaults null
    // highlightOnHover: surround pic with border on hover
    // highlightColor: color to use if highlighting
    // onClick: what to do on click of photo
    // size: width/height

    state = {
        username: null,
        hovered: false,
        innerHtml: null,
        color: this.props.color || "azure",
        photoUrl: this.props.photoUrl
    };

    baseStyle = {
        width: this.props.size || "50px",
        height: this.props.size || "50px",
        minWidth: this.props.size || "50px",
        minHeight: this.props.size || "50px",
        borderRadius: "10%",
        backgroundColor: "lightblue",
        transition: ".3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        boxShadow: "0 0 0 1pt transparent",
        color: this.state.color,
        textShadow: "1px 1px black"
    };

    hasPicStyle = {
        backgroundSize: "150% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    };

    hoverStyle = {
        // if highlight on hover, but no color provided, default royalblue
        boxShadow: "0 0 0 3pt " + (this.props.highlightColor || "royalblue")
    };

    handleHover = () => {
        this.setState({ hovered: true, innerHtml: this.props.highlightOnHover && this.props.innerHtml });
    };

    handleLeave = () => {
        this.setState({ hovered: false, innerHtml: null });
    };

    render() {
        // use pic as background if supplied
        let includePic = this.props.photoUrl ? {...this.hasPicStyle, backgroundImage: `url(${this.props.photoUrl})`} : {};
        // is it hovered, and should it be highlighted
        let hoveredStyle = (this.state.hovered && this.props.highlightOnHover) ? this.hoverStyle : {};
        return(
            <div
                style={{...this.baseStyle, ...includePic, ...hoveredStyle}}
                onClick={this.props.onClick}
                onMouseOver={this.handleHover}
                onMouseOut={this.handleLeave}
            >
                <span style={{
                    cursor: "pointer",
                    fontSize: "12px"
                }}>
                    {
                        // innerHtml displayed on hover
                        // if provided
                        this.state.innerHtml
                    }
                </span>
            </div>
        )
    }
}
