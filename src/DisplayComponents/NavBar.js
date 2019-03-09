import React from "react";
import { withRouter } from "react-router";
import MemberPicture from "./MemberPicture";
import Constants from "../Constants/Constants";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar

        state = {
            redirect: null
        };

        navStyle = {
            maxWidth: "1000px",
            margin: "auto",
            height: Constants.navBarHeight,
            display: "flex",
            justifyContent: "space-between"
        };

        navSectionStyle = {
            height: "100%",
            maxWidth: "150px",
            minWidth: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
        };

        navLeftStyle = {
            ...this.navSectionStyle
        };

        navRightStyle = {
            ...this.navSectionStyle,
        };

        navHomeLinkStyle = {
            cursor: "pointer"
        };

        render() {
            return(
                <div style={this.navStyle}>
                    {
                        this.props.userData ?
                        <div style={this.navLeftStyle}>
                            <MemberPicture
                                // redirect passed from MyGig component for app redirects
                                onClick={() => this.props.redirect("/account", this.props.location.pathname)}
                                // photoUrl for user
                                photoUrl={this.props.userData.photoUrl}
                                // highlight pic on hover
                                highlightOnHover={true}
                            />
                            <div
                                // redirect passed from MyGig component for app redirects
                                onClick={() => this.props.redirect("/", this.props.location.pathname)}
                                style={this.navHomeLinkStyle}
                            >
                                Home
                            </div>
                        </div>
                            :
                        <div>
                            {/* empty div for flex consistency */}
                        </div>
                    }
                    <div style={this.navRightStyle}>
                        {
                            this.props.userData ?
                                <div onClick={() => this.props.redirect("logout", this.props.location.pathname)}>
                                    Logout
                                </div>
                                    :
                                <div onClick={() => this.props.redirect("login", this.props.location.pathname)}>
                                    Login
                                </div>
                        }
                    </div>
                </div>
            )
        }
    }
)