import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../HelperComponents/Button";
import LoginForm from "../FormComponents/LoginForm";
import SignUpForm from "../FormComponents/SignUpForm";

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
            // if no redirect value, take back home
            return(
                <div>
                    {
                        this.state.showLogin ?
                            <LoginForm redirectOnLogin={this.redirectOnLogin} loginUser={this.props.loginUser} /> : <SignUpForm />
                    }
                    {/* Button to switch form view */}
                    <Button onClick={this.switchForm} innerText={this.state.showLogin ? "Sign Up" : "Login"} />
                </div>
            )
        }
    }
)