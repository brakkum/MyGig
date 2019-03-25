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
        sendingRequest: false,
        loginError: null
    };

    attemptLogin = event => {
        event.preventDefault();

        if (!this.state.email || !this.state.password) {
            return;
        }

        this.setState({
            sendingRequest: true,
            loginError: false
        });
        // login call
        fetch("/api/users/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("login successful");
                    this.props.loginUser(json);
                    this.props.redirectOnLogin();
                } else {
                    console.log("login failed: ", json);
                    this.setState({
                        sendingRequest: false,
                        loginError: "Invalid login."
                    });
                }
            }
        ).catch(e => console.log(e));
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
                <h3>
                    {this.state.loginError}
                </h3>
                <Button
                    onClick={this.attemptLogin}
                    preClickText={"Login"}
                    style={{float: "right"}}
                    colorType={"success"}
                    buttonType={"submit"}
                    sendingRequest={this.state.sendingRequest}
                />
            </form>
        )
    }
}
