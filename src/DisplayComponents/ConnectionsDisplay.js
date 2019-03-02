import React from "react";
import DisplayCase from "./DisplayCase";
import Connection from "./Connection";

export default class ConnectionsDisplay extends React.Component {
    // display user connections and requests
    // props
    // connections: the list of users to display

    render() {
        return(
            <DisplayCase label={this.props.label}>
                {
                    this.props.connections && this.props.connections.map((conn, i) => {
                        return <Connection {...conn} key={i} removeConnection={this.props.removeConnection} />
                    })
                }
            </DisplayCase>
        )
    }
}
