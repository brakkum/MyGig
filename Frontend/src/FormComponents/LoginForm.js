import React from "react";
import Button from "../HelperComponents/Button";
import Input from "../HelperComponents/Input";

export default class LoginForm extends React.Component {
    // login form for /login
    // attemptLogin tries to verify user input
    // on successful login, props.handleLogin
    // TODO: tell user what password requirements are

    state = {
        email: "",
        password: "",
        sendingRequest: false
    };

    attemptLogin = event => {
        event.preventDefault();
        
        // login call
        this.setState({
            sendingRequest: true
        });
        setTimeout(() => {
            this.props.loginUser(1);
            this.props.redirectOnLogin();
        }, 3000);
    };

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return(
            <form onSubmit={this.attemptLogin}>
                <Input
                    for={"Email"}
                    value={this.state.username}
                    name={"email"}
                    onChange={email => this.updateValue("email", email)}
                />
                <Input
                    for={"Password"}
                    value={this.state.password}
                    name={"password"}
                    type={"password"}
                    onChange={password => this.updateValue("password", password)}
                />
                <Button
                    onClick={this.attemptLogin}
                    innerText={"Login"}
                    style={{float: "right"}}
                    type={"success"}
                    sendingRequest={this.state.sendingRequest}
                />
            </form>
        )
    }
}
