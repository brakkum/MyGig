import React from "react";
import Spinner from "react-spinkit";

export default class Loading extends React.Component {
    // Loading icon that uses react-spinkit

    loadingStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    render() {
        return(
            <div className="loading-container" style={this.loadingStyle}>
                <Spinner name={"wave"} fadeIn={"half"} color={this.props.color || "darkgrey"} />
            </div>
        )
    }
}