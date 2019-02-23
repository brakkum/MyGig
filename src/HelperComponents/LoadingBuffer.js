import React from "react";
import Loading from "./Loading";

export default class LoadingBuffer extends React.Component {
    // Generates loading screen (props.waiting if supplied, otherwise default)
    // while status of props.loaded is false.

    render() {
        return(
            <div>
                {
                    this.props.loaded ? this.props.children : this.props.waiting != null ? this.props.waiting : <Loading />
                }
            </div>
        )
    }
}
