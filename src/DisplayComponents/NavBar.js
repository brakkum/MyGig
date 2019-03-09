import React from "react";
import { withRouter } from "react-router";
import MemberPicture from "./MemberPicture";
import Constants from "../Constants/Constants";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar
        // TODO: add login/logout button to right side
        // TODO: check user login status for account/home links/photo

        state = {
            redirect: null
        };

        navStyle = {
            maxWidth: "1100px",
            margin: "auto",
            height: Constants.navBarHeight
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

        render() {
            return(
                <div style={this.navStyle}>
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
                </div>
            )
        }
    }
)