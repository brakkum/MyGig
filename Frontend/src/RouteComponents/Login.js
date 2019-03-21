import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../HelperComponents/Button";
import LoginForm from "../FormComponents/LoginForm";
import SignUpForm from "../FormComponents/SignUpForm";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import "./Login.css";

export default withRouter(
    class Login extends React.Component {

        state = {
            showLogin: true,
            sendingRequest: false
        };

        redirectOnLogin = () => {
            // they logged in, now redirect
            // if no redirect value, take back home
            let to = (this.props.location && this.props.location.state) ? this.props.location.state.from : "/";
            this.props.redirect(to, this.props.location.pathname);
        };

        setJwtInLocalStorage = jwt => {
            localStorage.setItem("jwt", jwt);
        };

        getJwtInLocalStorage = () => {
            return localStorage.getItem("jwt");
        };

        deleteJwtInLocalStorage = () => {
            localStorage.removeItem("jwt");
        };

        switchForm = () => {
            this.setState({
               showLogin: !this.state.showLogin
            });
        };

        componentDidMount() {
            let jwt = this.getJwtInLocalStorage();
            if (jwt) {
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
                            this.props.loginUser(json);
                            this.redirectOnLogin();
                        } else {
                            console.log("validation by jwt failed: ", json);
                            this.props.pageLoaded();
                        }
                    }
                ).catch(e => {
                    console.log(e);
                    setTimeout(() => {
                        this.props.pageLoaded();
                    }, 1500);
                });
            } else {
                // This is necessary to work correctly
                setTimeout(() => {
                    this.props.pageLoaded();
                }, 1500);
            }
        }

        render() {
            return(
                <div className={"login-signup-box"}>
                    {/* Button to switch form view */}
                    <div
                        className={"form-switch"}
                        style={{
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Button
                            onClick={this.switchForm}
                            innerText={this.state.showLogin ? "Sign Up" : "Login"}
                            size={"lg"}
                        />
                    </div>
                    <DisplayCase
                        boxStyle={{position: "relative", overflow: "visible"}}
                        containerStyle={{height: "70vh"}}
                        backgroundColor={"transparent"}
                    >
                        <div className={`login login-${this.state.showLogin ? "show" : "hide"}`}>
                            <LoginForm
                                redirectOnLogin={this.redirectOnLogin}
                                loginUser={this.props.loginUser}
                            />
                        </div>
                        <div className={`login login-${!this.state.showLogin ? "show" : "hide"}`}>
                            <SignUpForm
                                redirectOnLogin={this.redirectOnLogin}
                                loginUser={this.props.loginUser}
                            />
                        </div>
                    </DisplayCase>
                </div>
            )
        }
    }
)