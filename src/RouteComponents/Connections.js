import React from "react";
import res from "./ConnectionsMockData";
import ConnectionsDisplay from "../DisplayComponents/ConnectionsDisplay";

export default class Connections extends React.Component {
    // top level route component for /connections

    state = {
        requests: null,
        connections: null,
        loaded: false
    };

    componentDidMount() {
        this.setState({
            requests: res.data.requests,
            connections: res.data.connections
        });
    };

    render() {
        return(
            <div>
                {
                    (this.state.requests && this.state.requests.length > 0) &&
                        <ConnectionsDisplay
                            label={"Requests"}
                            connections={this.state.requests}
                        />
                }
                {
                    (this.state.connections && this.state.connections.length > 0)
                    ?
                        <ConnectionsDisplay
                            label={"Connections"}
                            connections={this.state.connections}
                        />
                    :
                    <h2 style={{textAlign: "center"}}>
                        When you make some connections, they'll appear here
                    </h2>
                }
                Connections Page
            </div>
        )
    }
}
