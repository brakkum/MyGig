import React from "react";
import HasBeenSeen from "./HasBeenSeen";
import MemberPicture from "./MemberPicture";

export default class Connection extends React.Component {

    confirmRequest = () => {
        console.log('confirm ', this.props.id)
    };

    render() {
        let connectedToUser = this.props.connectedToUser;
        return(
            <HasBeenSeen accepted={connectedToUser} circleClick={!connectedToUser ? this.confirmRequest : null}>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    {this.props.name}
                    <MemberPicture photoUrl={this.props.photoUrl} size={"30px"} />
                </div>
            </HasBeenSeen>
        )
    }
}
