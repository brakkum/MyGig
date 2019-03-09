import React from "react";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class SignUpForm extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        passwordError: false,
        sendingRequest: false
    };

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    attemptSignUp = () => {
        let formValid = true;
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passwordError: true
            });
            formValid = false;
        } else {
            this.setState({
                passwordError: false
            });
        }
        // if it's valid, send it off
        if (formValid) {
            this.setState({
                sendingRequest: true
            });
        }
    };

    render() {
        return(
            <div>
                <Input
                    for={"First Name"}
                    value={this.state.firstName}
                    name={"firstname"}
                    onChange={firstName => this.updateValue("firstName", firstName)}
                />
                <Input
                    for={"Last Name"}
                    value={this.state.lastName}
                    name={"lastname"}
                    onChange={lastname => this.updateValue("lastName", lastname)}
                />
                <Input
                    for={"Email"}
                    value={this.state.email}
                    name={"email"}
                    type={"email"}
                    onChange={email => this.updateValue("email", email)}
                />
                <Input
                    for={"Password"}
                    value={this.state.password}
                    name={"password"}
                    type={"password"}
                    onChange={password => this.updateValue("password", password)}
                />
                <Input
                    for={"Confirm Password"}
                    value={this.state.passwordConfirm}
                    name={"passwordconfirm"}
                    type={"password"}
                    errorOverride={this.state.passwordError && "Passwords do not match"}
                    onChange={password => this.updateValue("passwordConfirm", password)}
                />
                <Button
                    onClick={this.attemptSignUp}
                    innerText={"Submit"}
                    style={{float: "right"}}
                    type={"success"}
                    sendingRequest={this.state.sendingRequest}
                />
            </div>
        )
    }
}
