import React from "react";
import Input from "../HelperComponents/Input";

export default class SignUpForm extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        });
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
                    onChange={email => this.updateValue("email", email)}
                />
                <Input
                    for={"Password"}
                    value={this.state.password}
                    name={"password"}
                    onChange={password => this.updateValue("password", password)}
                />
                <Input
                    for={"Confirm Password"}
                    value={this.state.passwordConfirm}
                    name={"passwordconfirm"}
                    onChange={password => this.updateValue("passwordConfirm", password)}
                />
            </div>
        )
    }
}
