import SignUpForm from "../FormComponents/SignUpForm";
import LoginForm from "../FormComponents/LoginForm";
import { withRouter } from "react-router-dom";
import React from "react";
import Progress from "../DisplayComponents/Progress";

export default withRouter(
    class Login extends React.Component {

        state = {
            visibleForm: "login",
            sendingRequest: false,
            showLoginPage: false
        };

        redirectOnLogin = () => {
            // 'to' is the requested url, or '/' if hitting default route
            let to = (this.props.location && this.props.location.state) ?
                this.props.location.state.from : "/";
            this.props.history.push(to, this.props.location.pathname);
        };

        getJwtInLocalStorage = () => {
            return localStorage.getItem("jwt");
        };

        componentDidMount() {
            const jwt = this.getJwtInLocalStorage();

            if (!jwt || jwt === "undefined") {
                this.setState({
                    showLoginPage: true
                });
                return;
            }

            fetch("/api/users/getUserFromToken", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    Jwt: jwt
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.loginUser(json.user, jwt);
                        this.redirectOnLogin();
                    } else {
                        this.setState({
                            showLoginPage: true
                        });
                    }
                }
            ).catch(e => {
                this.setState({
                    showLoginPage: true
                });
            });
        }

        render() {
            return(
                <div className="section">
                    {this.state.showLoginPage ?
                        <div className="columns is-vcentered">
                            <div className="column">
                                <div className="box">
                                    <div className="tabs">
                                        <ul>
                                            <li
                                                className={
                                                    this.state.visibleForm === "login" ?
                                                        "is-active" : ""
                                                }
                                                onClick={() => this.setState({visibleForm: "login"})}
                                            >
                                                <a href="#login">
                                                    Login
                                                </a>
                                            </li>
                                            <li
                                                className={
                                                    this.state.visibleForm === "signup" ?
                                                        "is-active" : ""
                                                }
                                                onClick={() => this.setState({visibleForm: "signup"})}
                                            >
                                                <a href="#signup">
                                                    Sign Up
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        this.state.visibleForm === "login" ?
                                            <div className="">
                                                <LoginForm
                                                    redirectOnLogin={this.redirectOnLogin}
                                                    loginUser={this.props.loginUser}
                                                />
                                            </div>
                                            :
                                            <div className="">
                                                <SignUpForm
                                                    redirectOnLogin={this.redirectOnLogin}
                                                    loginUser={this.props.loginUser}
                                                />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <Progress />
                    }
                </div>
            )
        }
    }
)