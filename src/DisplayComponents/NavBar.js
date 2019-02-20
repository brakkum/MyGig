import React from "react";
import { Redirect } from "react-router";
import UserPicture from "./UserPicture";

export default class NavBar extends React.Component {

    state = {
        redirect: null
    };

    navStyle = {
        maxWidth: "1300px",
        margin: "auto",
        height: "75px"
    };

    navLeftStyle = {
        height: "100%",
        maxWidth: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    };

    navHomeLinkStyle = {
        cursor: "pointer"
    };

    redirect = to => {
      this.setState({ redirect: to });
    };

    render() {
        let redirect = this.state.redirect;
        if (redirect) {
            this.setState({ redirect: null });
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div style={this.navStyle}>
                <div style={this.navLeftStyle}>
                    <UserPicture
                        onClick={() => this.redirect("/account")}
                        picUrl={this.props.userData.picUrl}
                    />
                    <div
                        onClick={() => this.redirect("/")}
                        style={this.navHomeLinkStyle}
                    >
                        Home
                    </div>
                </div>
            </div>
        )
    }
}
