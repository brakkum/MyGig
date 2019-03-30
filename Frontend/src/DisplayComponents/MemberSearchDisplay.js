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

    onClick = async () => {
        this.setState({
            sendingRequest: true
        });
        this.props.buttonFunc(this.state.userId)
            .then(success => {
                if (success) {
                    this.props.filterUser(this.state.userId);
                }
            });

        this.setState({
            sendingRequest: false
        });
    };

    render() {
        return(
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "10px",

            }}>
                <MemberPicture
                    photoUrl={this.state.photoUrl}
                    highlightOnHover={true}
                    innerHtml={"Add"}
                    onClick={this.onClick}
                />
                <Button
                    sendingRequest={this.state.sendingRequest}
                    preClickText={this.props.buttonText}
                    postClickText={"Sending.."}
                    onClick={this.onClick}
                />
                {this.state.fullName}
            </div>
        )
    }
}
