import React from "react";
import { Redirect } from "react-router";
import UserPicture from "./UserPicture";

export default class NavBar extends React.Component {

    state = {
        toHome: false,
        toAccount: false,
    };

    navbarStyle = {
        maxWidth: "1300px",
        margin: "auto",
        height: "75px"
    };

    navbarLeftStyle = {
        height: "100%",
        maxWidth: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    };

    navbarHomeLinkStyle = {
        cursor: "pointer"
    };

    toAccount = () => {
        this.setState({ toAccount: true });
    };

    toHome = () => {
        this.setState({ toHome: true });
    };

    render() {
        if (this.state.toAccount) {
            this.setState({ toAccount: false });
            return <Redirect to="/account" />
        } else if (this.state.toHome) {
            this.setState({ toHome: false });
            return <Redirect to="/" />
        }

        return(
            <div style={this.navbarStyle}>
                <div style={this.navbarLeftStyle}>
                    <UserPicture onClick={this.toAccount} />
                    <div onClick={this.toHome} style={this.navbarHomeLinkStyle}>Home</div>
                </div>
            </div>
        )
    }
}
