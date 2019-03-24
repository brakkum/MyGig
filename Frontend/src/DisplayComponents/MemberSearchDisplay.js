import React from "react";
import MemberPicture from "../DisplayComponents/MemberPicture";
import Button from "../HelperComponents/Button";

export default class MemberSearchDisplay extends React.Component {

    state = {
        userId: null,
        photoUrl: null,
        fullName: null,
        sendingRequest: false,
    };

    componentDidMount() {
        this.setState({
            userId: this.props.user.userId,
            photoUrl: this.props.user.photoUrl,
            fullName: this.props.user.fullName
        })
    }

    sendConnectionRequest = () => {
        let jwt = this.props.jwt;
        if (this.state.sendingRequest) {
            return;
        }
        this.setState({
            sendingRequest: true
        });
        fetch("/api/users/newconnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: this.state.userId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested");
                    this.props.filterUser(this.state.userId);
                } else {
                    console.log("fail, ", json);
                    this.setState({
                        sendingRequest: false
                    });
                }
            }).catch(e => console.log(e));
    };

    render() {
        return(
            <div style={{
                border: "1px solid red",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "10px",

            }}>
                <MemberPicture
                    photoUrl={this.state.photoUrl}
                    highlightOnHover={true}
                    innerHtml={"Add"}
                    onClick={() => this.sendConnectionRequest()}
                />
                <Button
                    sendingRequest={this.state.sendingRequest}
                    preClickText={"Connect"}
                    postClickText={"Sending.."}
                    onClick={this.sendConnectionRequest}
                />
                {this.state.fullName}
            </div>
        )
    }
}
