import React from "react";
import { withRouter } from "react-router";
import MemberPicture from "./MemberPicture";

export default withRouter(
    class NavBar extends React.Component {
        // MyGig page top navbar
        // TODO: add login/logout button to right side
        // TODO: check user login status for account/home links

        state = {
            redirect: null
        };

        navStyle = {
            maxWidth: "1100px",
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