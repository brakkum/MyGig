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

    confirmRequest = () => {
        this.setState({
            sendingRequest: true
        });
        setTimeout(() => {
            this.props.removeConnection(this.props.memberData.id);
        }, 1000)
    };

    render() {
        let connectedToUser = this.props.memberData.connectedToUser;
        let notConnectedToUser = !connectedToUser;
        return(
            <HasBeenSeen accepted={connectedToUser}>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    {this.props.memberData.name}
                    {
                        notConnectedToUser &&
                        <Button
                            onClick={this.confirmRequest}
                            preClickText={"Confirm"}
                            sendingRequest={this.state.sendingRequest}
                        />
                    }
                    <MemberPicture photoUrl={this.props.memberData.photoUrl} size={"30px"} />
                </div>
            </HasBeenSeen>
        )
    }
}
