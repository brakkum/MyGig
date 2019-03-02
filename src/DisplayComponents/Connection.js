import React from "react";
import HasBeenSeen from "./HasBeenSeen";
import MemberPicture from "./MemberPicture";
import Button from "../HelperComponents/Button";

export default class Connection extends React.Component {

    state = {
        sendingRequest: false
    };

    confirmRequest = () => {
        this.setState({
            sendingRequest: true
        });
        setTimeout(() => {
            this.props.removeConnection(this.props.id);
        }, 1000)
    };

    render() {
        let connectedToUser = this.props.connectedToUser;
        let notConnectedToUser = !connectedToUser;
        return(
            <HasBeenSeen accepted={connectedToUser}>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    {this.props.name}
                    {
                        notConnectedToUser &&
                        <Button
                            onClick={this.confirmRequest}
                            preClickText={"Confirm"}
                            sendingRequest={this.state.sendingRequest}
                        />
                    }
                    <MemberPicture photoUrl={this.props.photoUrl} size={"30px"} />
                </div>
            </HasBeenSeen>
        )
    }
}
