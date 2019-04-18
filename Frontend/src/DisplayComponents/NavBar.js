import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Constants from "../Constants/Constants";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar

        navStyle = {
            width: "100%",
            maxWidth: Constants.navbarMaxWidth,
            margin: "auto",
        };

        render() {
            return (
                <nav className="navbar is-dark">
                    <div style={this.navStyle}>
                        <div className="navbar-brand is-pulled-left">
                            <div className="navbar-item has-text-weight-bold">
                                MyGig
                            </div>
                        </div>
                        {this.props.userData &&
                            <div>
                                <div className="navbar-brand is-pulled-left">
                                    <Link to="/" className="navbar-item">
                                        Home
                                    </Link>
                                    <Link to="/account" className="navbar-item">
                                        Account
                                    </Link>
                                    <Link to="/search" className="navbar-item">
                                        Find Users
                                    </Link>
                                </div>
                                <div className="navbar-brand is-pulled-right">
                                    <Link to="/logout" className="navbar-item">
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            );
        }
    }
);

