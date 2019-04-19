import React from "react";
import ConnectionDisplay from "../DisplayComponents/ConnectionDisplay";

export default class Connections extends React.Component {

    _isMounted = false;

    state = {
        pageLoading: true,
        connections: [],
        jwt: ""
    };

    componentDidMount() {
        const jwt = this.props.jwt;
        this.setState({
            jwt: jwt
        });
        this._isMounted = true;

        fetch("/api/users/getAllConnections", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success) {
                    this.setState({
                        connections: json.connections,
                        pageLoading: false
                    });
                } else {
                    this.props.history.push("/");
                }
            }).catch(e => console.log(e));

    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const connections = this.state.connections;
        return(
            <div className="section">
                {this.state.pageLoading ?
                    <progress className="progress" />
                    :
                    <div>
                        {connections.map((connection, i) => {
                            return <ConnectionDisplay {...connection} key={i} />
                        })}
                    </div>
                }
            </div>
        )
    }
}
