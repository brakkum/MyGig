import React from "react";
import Button from "../HelperComponents/Button";
import Input from "../HelperComponents/Input";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";

export default class LoginForm extends React.Component {
    // login form for /login
    // attemptLogin tries to verify user input
    // on successful login, props.handleLogin
    // TODO: tell user what password requirements are

    state = {
        username: "",
        password: "",
        sendingRequest: false
    };

    attemptLogin = () => {
        // login call
        this.props.redirectOnLogin();
    };

    updateUsername = username => {
        this.setState({
            username: username
        });
    };

    updatePassword = password => {
        this.setState({
            username: password
        });
    };

    render() {
        return(
            <DisplayCase>
                <Input
                    for={"Email"}
                    cvalue={this.state.username}
                    name={"email"}
                    type={"email"}
                    onChange={username => this.updateUsername(username)}
                />
                <Input
                    for={"Password"}
                    value={this.state.password}
                    name={"password"}
                    type={"password"}
                    regex={"^[a-zA-Z0-9_]{8,50}$"}
                    error={"Invalid Password"}
                    onChange={password => this.updatePassword(password)}
                />
                <Button
                    onClick={this.attemptLogin}
                    innerText={"Login"}
                    style={{float: "right"}}
                    type={"success"}
                    sendingRequest={this.state.sendingRequest}
                />
            </DisplayCase>
        )
    }
}
