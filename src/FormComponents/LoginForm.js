import React from "react";
import Button from "../HelperComponents/Button";

export default class LoginForm extends React.Component {
    // login form for /login
    // attemptLogin tries to verify user input
    // on successful login, props.handleLogin

    attemptLogin = () => {
        // login call

        this.props.redirectOnLogin();
    };

    render() {
        return(
            <div>
                <Button onClick={this.attemptLogin} />
            </div>
        )
    }
}
