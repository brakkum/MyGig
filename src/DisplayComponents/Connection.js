import React from "react";
import HasBeenSeen from "./HasBeenSeen";

export default class Connection extends React.Component {

    render() {
        let connectedToUser = this.props.connectedToUser;
        return(
            <HasBeenSeen accepted={connectedToUser}>
                {this.props.name}
            </HasBeenSeen>
        )
    }
}
