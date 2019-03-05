import React from "react";
import HasBeenSeen from "./Containers/HasBeenSeen";
import MemberPicture from "./MemberPicture";
import Button from "../HelperComponents/Button";

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
                            sendingRequest ? <div>One moment....</div> : null

                    }
                    <MemberPicture photoUrl={this.props.memberData.photoUrl} size={"30px"} />
                </div>
            </HasBeenSeen>
        )
    }
}
