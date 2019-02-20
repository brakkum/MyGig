import React from "react";
import Loading from "./Loading";

export default class LoadingBuffer extends React.Component {
    // Generates loading screen (props.waiting, or default) while status of props.loaded is false.

    render() {
        return(
            <div style={this.divStyle}>
                {
                    this.props.loaded ? this.props.success : this.props.waiting != null ? this.props.waiting : <Loading />
                }
            </div>
        )
    }
}
