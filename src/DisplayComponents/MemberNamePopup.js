import React from "react";
import Popup from "./Popup";
import MemberPictureConnect from "./MemberPictureConnect";

export default class MemberNamePopup extends React.Component {
    // Popup for below username displays
    // props:
    // showPopup: boolean
    // width: popup width
    // top: how far from top of window to appear
    // left: how far from left of window to appear
    // memberData: memberData object for displayed user

    render() {
        return(
            <Popup
                showPopup={this.props.showPopup}
                width={this.props.width}
                top={this.props.top}
                left={this.props.left}
            >
                <MemberPictureConnect
                    memberData={this.props.memberData}
                />
            </Popup>
        )
    }
}
