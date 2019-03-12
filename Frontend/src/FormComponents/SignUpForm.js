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

    attemptSignUp = event => {
        event.preventDefault();
        
        let formValid = true;
        if (this.state.password !== this.state.passwordConfirm || this.state.password.length === 0) {
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
            fetch("/api/users/newuser", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"  
                },
                body: JSON.stringify({
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Email: this.state.email,
                    Password: this.state.password
                })
            }).then(res => res.json())
                .then(json => console.log(json))
        }
    };

    render() {
        return(
            <form onSubmit={this.attemptSignUp}>
                <Input
                    for={"First Name"}
                    value={this.state.firstName}
                    name={"firstName"}
                    onChange={firstName => this.updateValue("firstName", firstName)}
                />
                <Input
                    for={"Last Name"}
                    value={this.state.lastName}
                    name={"lastName"}
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
                    name={"passwordConfirm"}
                    type={"password"}
                    errorOverride={this.state.passwordError && "Passwords do not match"}
                    onChange={password => this.updateValue("passwordConfirm", password)}
                />
                <Button
                    onClick={this.attemptSignUp}
                    innerText={"Submit"}
                    style={{float: "right"}}
                    colorType={"success"}
                    buttonType={"submit"}
                    sendingRequest={this.state.sendingRequest}
                />
            </form>
        )
    }
}
