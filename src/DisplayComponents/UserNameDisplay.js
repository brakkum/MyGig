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

    modalHidden = {
        width: "0px",
        height: "0px",
    };

    modalShown = {
        height: this.props.height || "100px",
        width: this.props.width || "100px"
    };

    modalDefaultStyle = {
        position: "absolute",
        // backgroundColor: "red",
        // border: "1px solid red",
        justifyContent: "center",
    };

    transitionStyle = {
        transition: "all 1s",
    };

    containerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden",
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
                <div style={{...this.modalDefaultStyle, ...modalStyle, ...this.transitionStyle, top: this.state.modalTop + "px", left: this.state.modalLeft + "px"}}>
                    <div className="pic-container" style={this.containerStyle}>
                        <UserPicture photoUrl={this.props.memberData.photoUrl} />
                    </div>
                </div>
                <span style={this.memberStyle}>
                    {
                        this.props.memberData.name
                    }
                </span>
            </span>
        )
    }
}
