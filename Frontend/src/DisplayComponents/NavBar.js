import React from "react";
import { withRouter } from "react-router";
import MemberPicture from "./MemberPicture";
import Constants from "../Constants/Constants";
import Link from "../DisplayComponents/Containers/Link";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar

        navStyle = {
            maxWidth: "1000px",
            margin: "auto",
            height: Constants.navBarHeight,
            display: "flex",
            justifyContent: "space-between"
            // TODO: Transition
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
                            <Link
                                url={this.props.userData ? "/logout" : "/login"}
                                text={this.props.userData ? "Logout" : "Login"}
                                redirect={this.props.redirect}
                            />
                        }
                    </div>
                </div>
            )
        }
    }
)