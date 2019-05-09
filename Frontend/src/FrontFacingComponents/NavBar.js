import Constants from "../Constants/Constants";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import React from "react";

export default withRouter(
    class NavBar extends React.Component {

        navStyle = {
            width: "100%",
            maxWidth: Constants.navbarMaxWidth,
            margin: "auto",
        };

        render() {
            const userIsLoggedIn = this.props.user !== null;
            const isDunwoodyEmail = userIsLoggedIn && new RegExp(/@dunwoody\.edu$/).test(this.props.user.email);
            return (
                <nav className={"navbar is-dark " + (isDunwoodyEmail ? "dunwoody-nav" : "")}>
                    <div style={this.navStyle}>
                        <div className={"navbar-brand is-pulled-left " + (userIsLoggedIn ? "is-hidden-mobile" : "")}>
                            <div className="navbar-item has-text-weight-bold">
                                <a href="https://github.com/brakkum/MyGig" className="has-text-white">
                                    MyGig
                                </a>
                            </div>
                        </div>
                        {userIsLoggedIn &&
                            <div className="navbar-brand">
                                <Link to="/" className="navbar-item">
                                    Home
                                </Link>
                                <Link to="/account" className="navbar-item">
                                    Account
                                </Link>
                                <Link to="/search" className="navbar-item">
                                    Find Users
                                </Link>
                                <Link to="/logout" className="navbar-item">
                                    Logout
                                </Link>
                            </div>
                        }
                    </div>
                </nav>
            );
        }
    }
);
