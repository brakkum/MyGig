import React from "react";

export default class Logout extends React.Component {

    componentDidMount() {
        this.props.logoutUser();
        this.props.redirect("/login");
    }

    render() {
        return(
            <div>
                logout
            </div>
        )
    }
}
