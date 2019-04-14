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

        switchForm = () => {
            this.setState({
               toggleLoginAndSignUp: !this.state.toggleLoginAndSignUp
            });
        };

        componentDidMount() {
            let jwt = this.getJwtInLocalStorage();

            if (!jwt) {
                console.log("no jwt in storage");
                setTimeout(() => {
                    this.props.pageLoaded();
                }, 1500);
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
                        this.props.pageLoaded();
                    }
                }
            ).catch(e => {
                console.log("no response from back");
                setTimeout(() => {
                    this.props.pageLoaded();
                }, 1500);
            });
        }

        render() {
            return(
                <div className="section">
                    {/* Button to switch form view */}
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
                                    <a>
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
                                    <a>
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
            )
        }
    }
)