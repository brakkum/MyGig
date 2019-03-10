import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../HelperComponents/Button";
import LoginForm from "../FormComponents/LoginForm";
import SignUpForm from "../FormComponents/SignUpForm";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import "./Login.css";

export default withRouter(
    class Login extends React.Component {
        // TODO: create registration component

        state = {
            showLogin: true,
            sendingRequest: false,
            redirectedFrom: null
        };

        redirectOnLogin = () => {
            // check user credentials
            // handle user login

            // they logged in, now redirect
            // if no redirect value, take back home
            let to = (this.props.location && this.props.location.state) ? this.props.location.state.from : "/";
            this.props.redirect(to, this.props.location.pathname);
        };

        switchForm = () => {
            this.setState({
               showLogin: !this.state.showLogin
            });
        };

        componentDidMount() {
            setTimeout(() => {
                this.props.pageLoaded();
            }, 100);
        }

        render() {
            return(
                <div className={"login-signup-box"}>
                    {/* Button to switch form view */}
                    <div className={"form-switch"} style={{padding: "10px", display: "flex", justifyContent: "center"}}>
                        <Button
                            onClick={this.switchForm}
                            innerText={this.state.showLogin ? "Sign Up" : "Login"}
                            size={"lg"}
                        />
                    </div>
                    <DisplayCase boxStyle={{position: "relative", overflow: "visible"}} containerStyle={{height: "70vh"}} backgroundColor={"transparent"}>
                        <div className={`login login-${this.state.showLogin ? "show" : "hide"}`}>
                            <LoginForm redirectOnLogin={this.redirectOnLogin} loginUser={this.props.loginUser} />
                        </div>
                        <div className={`login login-${!this.state.showLogin ? "show" : "hide"}`}>
                            <SignUpForm />
                        </div>
                    </DisplayCase>
                </div>
            )
        }
    }
)