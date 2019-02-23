import React from "react";
import Popup from "./Popup";
import UserPicture from "./UserPicture";

export default class UserNamePopup extends React.Component {

    connectWithUser = id => {
        console.log("connectMethod ", id)
    };

    render() {
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
                    onClick={notConnectedToUser ? () => this.connectWithUser(this.props.memberData.id) : null}
                    highlight={notConnectedToUser}
                />
            </Popup>
        )
    }
}
