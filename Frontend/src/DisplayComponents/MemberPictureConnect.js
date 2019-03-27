import React from "react";
import MemberPicture from "./MemberPicture";

export default class MemberPictureConnect extends React.Component {

    connectWithUser = () => {
        console.log("connectMethod ", this.props.userId);
    };

    render() {
        let notConnectedToUser = !(this.props.connectedToUser);
        return(
            <MemberPicture
                photoUrl={this.props.photoUrl}
                innerHtml={notConnectedToUser ? "Add" : null}
                highlightOnHover={notConnectedToUser}
                onClick={notConnectedToUser ? () => this.connectWithUser() : null}
            />
        )
    }
}
