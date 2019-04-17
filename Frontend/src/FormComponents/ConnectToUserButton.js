import React from "react";

export default class ConnectToUserButton extends React.Component {

    sendConnectionRequest = id => {
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
                } else {
                    console.log("fail, ", json);
                }
            }).catch(e => console.log(e));
    };

    render() {
        return(
            <div className="is-hoverable">
                <button
                    className="button is-link is-small"
                    onClick={() => this.sendConnectionRequest(this.props.id)}
                >
                    Connect
                </button>
            </div>
        )
    }
}
