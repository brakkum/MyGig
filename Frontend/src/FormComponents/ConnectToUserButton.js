import React from "react";

export default class ConnectToUserButton extends React.Component {

    state = {
        sendingRequest: false,
        requestSent: false
    };

    sendConnectionRequest = id => {
        this.setState({sendingRequest: true});
        fetch("/api/users/newConnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested ", json);
                    this.setState({
                        requestSent: true
                    })
                } else {
                    console.log("fail, ", json);
                }
            }).catch(e => console.log(e));
        this.setState({sendingRequest: false});
    };

    render() {
        return(
            <div className="is-hoverable">
                <button
                    className={
                        "button " +
                        "is-small " +
                        (this.state.sendingRequest ? "is-loading " : "") +
                        (this.state.requestSent ? "is-success " : "is-info ")
                    }
                    onClick={() => this.sendConnectionRequest(this.props.id)}
                >
                    {this.state.requestSent ? "Requested" : "Connect"}
                </button>
            </div>
        )
    }
}
