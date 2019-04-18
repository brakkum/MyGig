import React from "react";

export default class ConnectToUserButton extends React.Component {

    _isMounted = false;

    state = {
        sendingRequest: false,
        requestSent: false
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendConnectionRequest = () => {
        this.setState({sendingRequest: true});
        fetch("/api/users/newConnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: this.props.userId
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success){
                    this.setState({
                        requestSent: true,
                        sendingRequest: false
                    })
                } else {
                    this.setState({sendingRequest: false});
                }
            }).catch(e => console.log(e));
    };

    render() {
        return(
            <div
                className="is-hoverable has-text-centered"
                style={{margin: "10px"}}
            >
                <button
                    className={
                        "button " +
                        "is-small " +
                        (this.state.sendingRequest ? "is-loading " : "") +
                        (this.state.requestSent ? "is-success " : "is-info ")
                    }
                    onClick={() => this.sendConnectionRequest()}
                >
                    {this.state.requestSent ? "Requested" : "Connect"}
                </button>
            </div>
        )
    }
}
