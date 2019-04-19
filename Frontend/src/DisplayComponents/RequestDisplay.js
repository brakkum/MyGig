import MemberPictureDisplay from "./MemberPictureDisplay";
import React from "react";

export default class RequestDisplay extends React.Component {

    state = {
        sendingRequest: false,
        requestType: null,
        typeId: null,
        jwt: ""
    };

    acceptRequest = () => {
        this.setState({sendingRequest: true});
        fetch("/api/requests/confirm", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                RequestType: this.state.requestType,
                TypeId: this.state.typeId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.props.filterRequests(
                        this.state.requestType,
                        this.state.typeId
                    );
                } else {
                    this.setState({
                        sendingRequest: false
                    })
                }
            }
        ).catch(e => console.log(e));
    };

    denyRequest = () => {
        this.setState({sendingRequest: true});
        fetch("/api/requests/deny", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                RequestType: this.state.requestType,
                TypeId: this.state.typeId
            })
        }).then(res => res.json())
            .then(json => {
                    if (json.success) {
                        this.props.filterRequests(
                            this.state.requestType,
                            this.state.typeId
                        );
                    } else {
                        this.setState({
                            sendingRequest: false
                        })
                    }
                }
            ).catch(e => console.log(e));
    };

    componentDidMount() {
        this.setState({
            requestType: this.props.requestType,
            typeId: this.props.typeId,
            jwt: this.props.jwt
        })
    }

    render() {
        return(
            <div>
                <div className="columns is-vcentered">
                    <div className="column">
                        <MemberPictureDisplay
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
                        {this.state.sendingRequest ?
                            <progress className="progress" />
                            :
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}
