import React from "react";
import UserPicture from "./UserNameDisplay";
import Modal from "./Modal";

export default class UserHoverModal extends React.Component {

    render() {
        return(
            <Modal showModal={this.props.showModal}
                top={this.props.top}
                left={this.props.left}
                width={this.props.width}
                interior={
                    <UserPicture
                        photoUrl={this.props.memberData && this.props.memberData.photoUrl}
                    />
                }
            />
        )
    }
}
