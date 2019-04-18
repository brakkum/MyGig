import React from "react";
import MemberPicture from "./MemberPicture";

export default class Request extends React.Component {

    state = {
        sendingRequest: false,
    };

    acceptRequest = () => {
        let requestType = this.props.requestType;
        let typeId = this.props.typeId;
        let jwt = this.props.jwt;

        this.setState({sendingRequest: true});
        fetch("/api/requests/confirm", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                RequestType: requestType,
                TypeId: typeId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.props.filterRequests(requestType, typeId);
                } else {
                    this.setState({
                        sendingRequest: false
                    })
                }
            }
        ).catch(e => console.log(e));
    };

    denyRequest = () => {
        let reqType = this.props.requestType;
        let typeId = this.props.typeId;
        let jwt = this.props.jwt;

        this.setState({sendingRequest: true});
        fetch("/api/requests/deny", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                RequestType: reqType,
                TypeId: typeId
            })
        }).then(res => res.json())
            .then(json => {
                    if (json.success) {
                        this.props.filterRequests(reqType, typeId);
                    } else {
                        this.setState({
                            sendingRequest: false
                        })
                    }
                }
            ).catch(e => console.log(e));
    };

    render() {
        return(
            <div>
                <div className="columns is-vcentered">
                    <div className="column">
                        <MemberPicture
                            photoUrl={this.props.userPhoto}
                            width={"100px"}
                        />
                    </div>
                    <div className="column">
                        <h5 className="is-size-5 has-text-centered">
                            {this.props.text}
                        </h5>
                    </div>
                    <div className="column">
                        <div className="buttons is-flex is-centered">
                            <button
                                className="button is-success"
                                onClick={this.acceptRequest}
                            >
                                Accept
                            </button>
                            <button
                                className="button is-danger"
                                onClick={this.denyRequest}
                            >
                                Deny
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
