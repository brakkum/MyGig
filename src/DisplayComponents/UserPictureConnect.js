import React from "react";
import UserPicture from "./UserPicture";

export default class UserPictureConnect extends React.Component {

    connectWithUser = () => {
        console.log("connectMethod ", this.props.memberData.id);
    };

    render() {
        let notConnectedToUser = !(this.props.memberData.connectedToUser);
        return(
            <UserPicture
                photoUrl={this.props.memberData.photoUrl}
                innerHtml={notConnectedToUser ? "Add" : null}
                highlightOnHover={notConnectedToUser}
                onClick={notConnectedToUser ? () => this.connectWithUser() : null}
            />
        )
    }
}
