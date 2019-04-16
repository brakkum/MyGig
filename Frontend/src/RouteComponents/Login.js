import React from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../FormComponents/LoginForm";
import SignUpForm from "../FormComponents/SignUpForm";

export default withRouter(
    class Login extends React.Component {

        state = {
            visibleForm: "login",
            sendingRequest: false,
            showLoginPage: false
        };

        redirectOnLogin = () => {
            // they logged in, now redirect
            // if no redirect value, take back home
            let to = (this.props.location && this.props.location.state) ? this.props.location.state.from : "/";
            // this.props.redirect(to, this.props.location.pathname);
            this.props.history.push(to, this.props.location.pathname);
        };

        getJwtInLocalStorage = () => {
            return localStorage.getItem("jwt");
        };

        componentDidMount() {
            let jwt = this.getJwtInLocalStorage();

            if (!jwt) {
                console.log("no jwt in storage");
                this.setState({
                    showLoginPage: true
                });
                return;
            }

            fetch("/api/users/getuserfromtoken", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                body: JSON.stringify({
                    Jwt: jwt
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success){
                        json.jwt = jwt;
                        this.props.loginUser(json);
                        this.redirectOnLogin();
                    } else {
                        console.log("validation by jwt failed: ", json);
                    }
                }
            ).catch(e => {
                console.log("no response from back ", e);
                this.setState({
                    showLoginPage: true
                });
            });
        }

        render() {
            return(
                <div className="section">
                    {this.state.showLoginPage ?
                        <div>
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
                        :
                        <progress className="progress" />
                    }
                </div>
            )
        }
    }
)