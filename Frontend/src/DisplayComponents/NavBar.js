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
                        this.props.userData &&
                            <div style={this.navLeftStyle}>
                                <MemberPicture
                                    // redirect passed from MyGig component for app redirects
                                    onClick={() => this.props.redirect("/account", this.props.location.pathname)}
                                    // photoUrl for user
                                    photoUrl={this.props.photoUrl || undefined}
                                    // highlight pic on hover
                                    highlightOnHover={true}
                                    innerHtml={"account"}
                                    size={"60px"}
                                />
                                <div
                                    // redirect passed from MyGig component for app redirects
                                    style={this.navHomeLinkStyle}
                                >
                                    <Link
                                        url={"/"}
                                        text={"Home"}
                                        redirect={this.props.redirect}
                                    />
                                </div>
                            </div>
                    }
                    {
                        this.props.userData &&
                            <div style={this.navRightStyle}>
                                {
                                    <Link
                                        url={"/logout"}
                                        text={"Logout"}
                                        redirect={this.props.redirect}
                                    />
                                }
                            </div>
                    }
                </div>
            )
        }
    }
)