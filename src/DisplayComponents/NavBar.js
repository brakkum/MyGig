import React from "react";
import { Redirect } from "react-router";
import "./NavBar.css";
import UserPicture from "./UserPicture";

export default class NavBar extends React.Component {
    state = {
        toHome: false,
        toAccount: false,
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
            <div className="navbar">
                <div className="navbar-left">
                    <UserPicture onClick={this.toAccount} />
                    <div onClick={this.toHome} className="navbar-home-link">Home</div>
                </div>
            </div>
        )
    }
}
