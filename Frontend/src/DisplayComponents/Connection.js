import React from "react";
import HasBeenSeen from "./Containers/HasBeenSeen";
import MemberPicture from "./MemberPicture";
import Button from "../HelperComponents/Button";
import TimeSince from "../HelperComponents/TimeSince";

export default class Connection extends React.Component {
    // Represents a connection or connection request for user
    // props:
    // memberData: member referenced
    // removeConnection: called on confirmation of request to
    //                   update connection request display box

    state = {
        sendingRequest: false
    };

    acceptConnectionRequest = accept => {
        this.setState({
            sendingRequest: true
        });
        setTimeout(() => {
            this.props.acceptConnectionRequest(accept, this.props.memberData.id);
        }, 1000)
    };

    render() {
        let connectedToUser = this.props.memberData.connectedToUser;
        let notConnectedToUser = !connectedToUser;
        let sendingRequest = this.state.sendingRequest;
        return(
            <HasBeenSeen accepted={connectedToUser}>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    {this.props.memberData.name}
                    {
                        // If not connected to user, and not sending
                        // request accept/deny, show buttons
                        (notConnectedToUser && !sendingRequest) ?
                            <div>
                                <Button
                                    onClick={() => this.acceptConnectionRequest(true)}
                                    preClickText={"Confirm"}
                                    sendingRequest={this.state.sendingRequest}
                                />
                                <Button
                                    onClick={() => this.acceptConnectionRequest(false)}
                                    preClickText={"Deny"}
                                    sendingRequest={this.state.sendingRequest}
                                    type={"danger"}
                                />
                            </div> :
                            // Otherwise if a request is sending
                            sendingRequest &&
                                // let user know
                                <div>One moment....</div>
                    }
                    <div style={{display: "flex", alignItems: "center"}}>
                    {
                        // show how long users have been connected
                        this.props.memberData.connectedToUser &&
                            <TimeSince time={this.props.memberData.connectedSince} size={"12px"} />
                    }
                    <MemberPicture photoUrl={this.props.memberData.photoUrl} size={"30px"} />
                    </div>
                </div>
            </HasBeenSeen>
        )
    }
}
