import React from "react";
import Popup from "./Popup";
import UserPicture from "./UserPicture";

export default class UserNamePopup extends React.Component {
    // Popup for below username displays
    // props:
    // showPopup: boolean
    // width: popup width
    // top: how far from top of window to appear
    // left: how far from left of window to appear
    // memberData: memberData object for displayed user

    // method called on click of user picture
    connectWithUser = () => {
        console.log("connectMethod ", this.props.memberData.id)
    };

    render() {
        // is logged in user connected with user being displayed?
        let notConnectedToUser = !this.props.memberData.connectedToUser;
        return(
            <Popup
                showPopup={this.props.showPopup}
                width={this.props.width}
                top={this.props.top}
                left={this.props.left}
            >
                <UserPicture
                    photoUrl={this.props.memberData.photoUrl}
                    innerHtml={notConnectedToUser ? "Add" : ""}
                    onClick={notConnectedToUser ? () => this.connectWithUser() : null}
                    highlightOnHover={notConnectedToUser}
                />
            </Popup>
        )
    }
}
