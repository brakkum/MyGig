import ConnectToUserButton from "../Buttons/ConnectToUserButton";
import MemberPictureDisplay from "./MemberPictureDisplay";
import React from "react";

export default class MemberPhotoAndConnectButtonDisplay extends React.Component {

    render() {
        return(
            <div>
                <MemberPictureDisplay {...this.props} />
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
