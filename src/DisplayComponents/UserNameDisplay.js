import React from "react";
import ReactDOM from "react-dom";
import UserPicture from "./UserPicture";


export default class UserNameDisplay extends React.Component {

    state = {
        showModal: false,
        location: null,
        modalTop: null,
        modalLeft: null,
        modalWidth: null
    };

    memberStyle = {
        margin: "10px"
    };

    modalDefault = {
        position: "absolute",
        // backgroundColor: "red",
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

    handleMouseOver = () => {
        this.setState({
           showModal: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
           showModal: false
        });
    };

    updateLocation = () => {
        let rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({
            location: rect,
            modalTop: rect.bottom,
            modalLeft: rect.left,
            modalWidth: rect.width
        });
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateLocation);
    }

    componentDidMount() {
        this.updateLocation();
        window.addEventListener("resize", this.updateLocation);
    }

    render() {
        let modalStyle = this.state.showModal ? this.modalShown : this.modalHidden;

        return(
            <span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <div style={{...this.modalDefault, ...modalStyle, top: this.state.modalTop + "px", left: this.state.modalLeft + "px", width: this.state.modalWidth}}>
                    <div className="pic-container" style={this.picContainerStyle}>
                        <UserPicture picUrl={this.props.userData.photoUrl} />
                    </div>
                </div>

                <span style={this.memberStyle}>
                    {
                        this.props.userData.name
                    }
                </span>
            </span>
        )
    }
}
