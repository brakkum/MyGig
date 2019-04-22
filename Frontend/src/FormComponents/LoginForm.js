import React from "react";

export default class LoginForm extends React.Component {

    state = {
        email: "",
        emailValid: true,
        password: "",
        passwordValid: true,
        sendingRequest: false,
        loginError: ""
    };

    attemptLogin = event => {
        event.preventDefault();

        let valid = true;

        if (!this.state.email) {
            this.setState({
                emailValid: false
            });
            valid = false;
        } else {
            this.setState({
                emailValid: true,
            });
        }

        if (!this.state.password) {
            this.setState({
                passwordValid: false,
            });
            valid = false;
        } else {
            this.setState({
                passwordValid: true,
            });
        }

        if (!valid) {
            this.setState({
                loginError: "Please enter required fields"
            });
            return;
        }

        this.setState({
            sendingRequest: true,
            loginError: ""
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
                    this.props.loginUser(json.user, json.jwt);
                    this.props.redirectOnLogin();
                } else {
                    this.setState({
                        sendingRequest: false,
                        passwordValid: false,
                        emailValid: false,
                        loginError: "Invalid login."
                    });
                }
            }
        ).catch(e => {
            this.setState({sendingRequest: false});
        });
    };

    updateValue = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    render() {
        return(
            <form onSubmit={this.attemptLogin}>
                <div className="field">
                    <label className="label">
                        Email
                    </label>
                    <input
                        value={this.state.username}
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
                <div className="field columns">
                    <div className="column is-three-quarters">
                        <span>
                            {this.state.loginError}
                        </span>
                    </div>
                    <div className="column" style={{overflow: "auto"}}>
                        <button
                            onClick={this.attemptLogin}
                            className={
                                "button is-info is-pulled-right " +
                                (this.state.sendingRequest && "is-loading")
                            }
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}
