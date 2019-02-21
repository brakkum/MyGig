import React from "react";
import UserPicture from "./UserNameDisplay";

export default class UserHoverModal extends React.Component {

    state = {
        userData: null,
        componentTop: null,
        componentLeft: null,
        componentWidth: null,
        picUrl: null
    };

    modalDefault = {
        position: "absolute",
        backgroundColor: "red",
        justifyContent: "center",
        transition: "all 1s",
    };

    modalHidden = {
        height: "0px",
    };

    modalShown = {
        height: "100px"
    };

    picContainerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.setState({
                userData: this.props.userData,
                componentTop: this.props.componentLocation.top,
                componentLeft: this.props.componentLocation.left,
                componentWidth: this.props.componentLocation.width,
                picUrl: this.props.userData.picUrl
            });
        }
    }

    render() {
        let modalStyle = this.props.showModal ? this.modalShown : this.modalHidden;

        return(
            <div style={{...this.modalDefault, ...modalStyle, top: this.state.componentTop + "px", left: this.state.componentLeft + "px", width: this.state.componentWidth }}>
                <div style={{ width: "100%", textAlign: "center" }}>{ this.props.userData.name }</div>
                <div className="pic-container" style={this.picContainerStyle}>
                    <UserPicture picUrl={ this.state.picUrl } />
                </div>
            </div>
        )
    }
}
