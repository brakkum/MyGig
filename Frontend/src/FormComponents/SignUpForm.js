import React from "react";

export default class SignUpForm extends React.Component {

    state = {
        firstName: "",
        firstNameValid: true,
        lastName: "",
        lastNameValid: true,
        email: "",
        emailValid: true,
        password: "",
        passwordValid: true,
        passwordConfirm: "",
        passwordConfirmValid: true,
        signUpError: [],
        sendingRequest: false
    };

    updateValue = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    attemptSignUp = event => {
        event.preventDefault();
        let valid = true;
        let errors = [];

        if (!this.state.firstName) {
            this.setState({
                firstNameValid: false
            });
            errors.push("Please fill out all fields");
            valid = false;
        } else {
            this.setState({
                firstNameValid: true
            });
        }

        if (!this.state.lastName) {
            this.setState({
                lastNameValid: false
            });
            errors.push("Please fill out all fields");
            valid = false;
        } else {
            this.setState({
                lastNameValid: true
            });
        }

        if (!this.state.email) {
            this.setState({
                emailValid: false
            });
            errors.push("Please fill out all fields");
            valid = false;
        } else {
            this.setState({
                emailValid: true
            });
        }

        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passwordValid: false,
                passwordConfirmValid: false
            });
            errors.push("Mismatched passwords");
            valid = false;
        } else {
            if (this.state.password.length < 6) {
                this.setState({
                    passwordValid: false,
                    passwordConfirmValid: false
                });
                errors.push("Password too short");
                valid = false;
            } else {
                this.setState({
                    passwordValid: true,
                    passwordConfirmValid: true
                });
            }
        }

        if (!valid) {
            this.setState({
                signUpError: errors
            });
            return;
        }

        // if it's valid, send it off
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
                Password: this.state.password,
                PasswordConfirm: this.state.passwordConfirm
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("signup successful");
                    this.props.loginUser(json);
                    this.props.redirectOnLogin();
                } else {
                    console.log("signup failed: ", json);
                    alert("Something went wrong, please try again.");
                    this.setState({
                        sendingRequest: false
                    });
                }
            }
        ).catch(e => {
            console.log(e);
            this.setState({sendingRequest: false});
        });

    };

    render() {
        return(
            <form onSubmit={this.attemptSignUp}>
                <div className="field">
                    <label className="label">
                        First Name
                    </label>
                    <input
                        value={this.state.firstName}
                        type="text"
                        className={
                            "input " +
                            (!this.state.firstNameValid && "is-danger ") +
                            (this.state.sendingRequest && "disabled ")
                        }
                        onChange={e => this.updateValue("firstName", e)}
                    />
                </div>
                <div className="field">
                    <label className="label">
                        Last Name
                    </label>
                    <input
                        value={this.state.lastName}
                        type="text"
                        className={
                            "input " +
                            (!this.state.lastNameValid && "is-danger ") +
                            (this.state.sendingRequest && "disabled ")
                        }
                        onChange={e => this.updateValue("lastName", e)}
                    />
                </div>
                <div className="field">
                    <label className="label">
                        Email
                    </label>
                    <input
                        value={this.state.email}
                        type="text"
                        className={
                            "input " +
                            (!this.state.emailValid && "is-danger ") +
                            (this.state.sendingRequest && "disabled ")
                        }
                        onChange={e => this.updateValue("email", e)}
                    />
                </div>
                <div className="field">
                    <label className="label">
                        Password
                    </label>
                    <input
                        value={this.state.password}
                        type="password"
                        className={
                            "input " +
                            (!this.state.passwordValid && "is-danger ") +
                            (this.state.sendingRequest && "disabled ")
                        }
                        onChange={e => this.updateValue("password", e)}
                    />
                </div>
                <div className="field">
                    <label className="label">
                        Confirm Password
                    </label>
                    <input
                        value={this.state.passwordConfirm}
                        type="password"
                        className={
                            "input " +
                            (!this.state.passwordConfirmValid && "is-danger ") +
                            (this.state.sendingRequest && "disabled ")
                        }
                        onChange={e => this.updateValue("passwordConfirm", e)}
                    />
                </div>
                <div className="field columns">
                    <div className="column is-three-quarters">
                        <span>
                            {this.state.signUpError[0]}
                        </span>
                    </div>
                    <div className="column">
                        <button
                            onClick={this.attemptLogin}
                            className={
                                "button is-info is-pulled-right " +
                                (this.state.sendingRequest && "is-loading")
                            }
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}
