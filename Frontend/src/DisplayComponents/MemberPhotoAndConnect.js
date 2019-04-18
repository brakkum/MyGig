import React from "react";
import MemberPicture from "./MemberPicture";
import ConnectToUserButton from "../FormComponents/ConnectToUserButton";

export default class MemberPhotoAndConnect extends React.Component {

    render() {
        return(
            <div>
                <MemberPicture {...this.props} />
                {!this.props.connectedToUser &&
                    <div className="is-hoverable">
                        <ConnectToUserButton
                            jwt={this.props.jwt}
                            userId={this.props.userId}
                        />
                    </div>
                }
            </div>
        )
    }
}
