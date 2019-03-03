import React from "react";
import res from "../MockData/ConnectionsMockData";
import ConnectionsDisplay from "../DisplayComponents/ConnectionsDisplay";

export default class Connections extends React.Component {
    // top level route component for /connections

    _isMounted = false;

    state = {
        requests: null,
        connections: null,
        loaded: false
    };

    confirmConnectionRequest = id => {
        // TODO: send confirmation of request
        if (this._isMounted) {
            let result = this.state.requests.filter(con =>
                con.id !== id
            );
            this.setState({
                requests: result
            });
            console.log("confirmed ", id);
        }
        // TODO: on success, update connections display
    };

    denyConnectionRequest = id => {
        // TODO: send denial of request
        if (this._isMounted) {
            let result = this.state.requests.filter(con =>
                con.id !== id
            );
            this.setState({
                requests: result
            });
            console.log("denied ", id);
        }
        // TODO: on success, update connections display
    };

    componentDidMount() {
        this.setState({
            requests: res.data.requests,
            connections: res.data.connections
        });
        this._isMounted = true;
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>
                {
                    // Show requests display if there are requests
                    (this.state.requests && this.state.requests.length > 0) &&
                        // Connection Requests
                        <ConnectionsDisplay
                            label={"Requests"}
                            connections={this.state.requests}
                            confirmConnectionRequest={this.confirmConnectionRequest}
                            denyConnectionRequest={this.denyConnectionRequest}
                        />
                }
                {
                    // Show connections or message if no connections
                    (this.state.connections && this.state.connections.length > 0)
                    ?
                        // Connections
                        <ConnectionsDisplay
                            label={"Connections"}
                            connections={this.state.connections}
                        />
                    :
                        // User has no connections
                    <h2 style={{textAlign: "center"}}>
                        When you make some connections, they'll appear here
                    </h2>
                }
                Connections Page
            </div>
        )
    }
}
