import React from "react";
import ReactDOM from "react-dom";
import UserPicture from "./UserPicture";
import Popup from "./Popup";

export default class UserNameDisplay extends React.Component {

    state = {
        showPopup: false,
        location: null,
        popupTop: null,
        popupLeft: null,
        popupWidth: null
    };

    memberStyle = {
        margin: "10px"
    };

    handleMouseOver = () => {
        this.setState({
           showPopup: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
           showPopup: false
        });
    };

    updateLocation = () => {
        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({
            location: rect,
            popupTop: rect.bottom,
            popupLeft: rect.left,
            popupWidth: rect.width
        });
    };

    connectWithUser = id => {
        console.log("connectMethod ", id)
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateLocation);
    }

    componentDidMount() {
        this.updateLocation();
        window.addEventListener("resize", this.updateLocation);
    }

    render() {
        let notConnectedToUser = !this.props.memberData.connectedToUser;
        return(
            <span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <span style={this.memberStyle}>
                    {
                        this.props.memberData.name
                    }
                </span>
                    <Popup
                        showPopup={this.state.showPopup}
                        width={this.state.popupWidth}
                        top={this.state.popupTop}
                        left={this.state.popupLeft}
                    >
                        <UserPicture
                            photoUrl={this.props.memberData.photoUrl}
                            innerHtml={notConnectedToUser ? "Add" : ""}
                            onClick={notConnectedToUser ? () => this.connectWithUser(this.props.memberData.id) : null}
                            highlight={notConnectedToUser}
                        />
                    </Popup>
            </span>
        )
    }
}
