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
                    this.props.loginUser(json.data);
                    this.props.redirectOnLogin();
                } else {
                    console.log("signup failed: ", json);
                    this.setState({
                        sendingRequest: false
                    });
                }
            }
        );
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
                    colorType={"success"}
                    buttonType={"submit"}
                    sendingRequest={this.state.sendingRequest}
                />
            </form>
        )
    }
}
