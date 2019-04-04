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
        justifyContent: "space-between",
        margin: "10px"
    };

    acceptRequest = () => {
        let requestType = this.props.requestType;
        let typeId = this.props.typeId;
        let jwt = this.props.jwt;
        console.log("accept");
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
                console.log(json)
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
            <div style={this.requestStyle}>
                <div style={{maxWidth: "15%"}}>
                    <MemberPicture photoUrl={this.props.userPhoto} />
                </div>
                <span style={{fontSize: "12px", textAlign: "center"}}>
                    {this.props.text}
                </span>
                <div style={{minWidth: "150px"}}>
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
