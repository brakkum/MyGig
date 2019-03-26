import React from "react";
import MemberPicture from "./MemberPicture";
import Button from "../HelperComponents/Button";

export default class Request extends React.Component {

    state = {
        sendingRequest: false,
    };

    requestStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "10px"
    };

    acceptRequest = () => {
        let reqId = this.props.requestId;
        let jwt = this.props.jwt;
        this.setState({sendingRequest: true});
        fetch("/api/requests/confirm", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                RequestId: reqId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.props.filterRequests(reqId);
                } else {
                    this.setState({
                        sendingRequest: false
                    })
                }
            }
        ).catch(e => console.log(e));
    };

    denyRequest = () => {
        let reqId = this.props.requestId;
        let jwt = this.props.jwt;

        this.setState({sendingRequest: true});
        fetch("/api/requests/deny", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                RequestId: reqId
            })
        }).then(res => res.json())
            .then(json => {
                    if (json.success) {
                        this.props.filterRequests(reqId);
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
            <div style={this.requestStyle}>
                <MemberPicture photoUrl={this.props.userPhoto} />
                {
                    this.props.text
                }
                <div style={{display: "flex"}}>
                    {
                        !this.state.sendingRequest ?
                            <div>
                                <Button
                                    preClickText={"Accept"}
                                    onClick={this.acceptRequest}
                                    colorType={"success"}
                                />
                                <Button
                                    preClickText={"Deny"}
                                    onClick={this.denyRequest}
                                    colorType={"danger"}
                                />
                            </div>
                            :
                            <div>
                                One moment..
                            </div>
                    }
                </div>
            </div>
        )
    }
}
