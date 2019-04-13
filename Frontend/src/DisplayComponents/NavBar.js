import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar

        navStyle = {
            maxWidth: "1000px",
            margin: "auto",
        };

        render() {
            return (
                <nav style={this.navStyle} className="navbar">
                    {this.props.userData &&
                        <div>
                            <div className="navbar-brand is-pulled-left">
                                <div className="navbar-item is-size-4">
                                    MyGig
                                </div>
                                <Link to="/" className="navbar-item">
                                    Home
                                </Link>
                                <Link to="/account" className="navbar-item">
                                    Account
                                </Link>
                            </div>
                            <div className="navbar-brand is-pulled-right">
                                <Link to="/logout" className="navbar-item">
                                    Logout
                                </Link>
                            </div>
                        </div>
                    }
                </nav>
            );
        }
    }
);

