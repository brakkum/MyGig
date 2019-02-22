import React from "react";
import { withRouter } from "react-router";
import UserPicture from "./UserPicture";

export default withRouter(
    class NavBar extends React.Component {

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

        render() {
            return(
                <div style={this.navStyle}>
                    <div style={this.navLeftStyle}>
                        <UserPicture
                            onClick={() => this.props.redirect("/account", this.props.location.pathname)}
                            picUrl={this.props.userData.picUrl}
                            highlight={true}
                        />
                        <div
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