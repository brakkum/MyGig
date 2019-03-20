import React from "react";

export default class Logout extends React.Component {

    state = {
        completed: false
    };

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
