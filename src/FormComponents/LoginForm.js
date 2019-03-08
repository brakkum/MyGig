import React from "react";
import Button from "../HelperComponents/Button";
import Input from "../HelperComponents/Input";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import Loading from "../HelperComponents/Loading";

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
        this.setState({
            sendingRequest: true
        });
        setTimeout(() => {
            this.props.loginUser(1);
            this.props.redirectOnLogin();
        }, 3000);
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
                    value={this.state.username}
                    name={"email"}
                    onChange={username => this.updateUsername(username)}
                />
                <Input
                    for={"Password"}
                    value={this.state.password}
                    name={"password"}
                    type={"password"}
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
