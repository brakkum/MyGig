import React from "react";
import MemberPicture from "./MemberPicture";

export default class MemberPictureConnect extends React.Component {

    connectWithUser = () => {
        console.log("connectMethod ", this.props.memberData.id);
    };

    render() {
        let notConnectedToUser = !(this.props.memberData.connectedToUser);
        return(
            <MemberPicture
                photoUrl={this.props.memberData.photoUrl}
                innerHtml={notConnectedToUser ? "Add" : null}
                highlightOnHover={notConnectedToUser}
                onClick={notConnectedToUser ? () => this.connectWithUser() : null}
            />
        )
    }
}
