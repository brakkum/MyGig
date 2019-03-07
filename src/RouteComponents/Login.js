import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Button from "../HelperComponents/Button";
import Input from "../HelperComponents/Input";

export default withRouter(
    class Login extends React.Component {
        // TODO: create registration component

        state = {
            redirect: false,
            showLogin: true,
            sendingRequest: false,
        };

        handleLogin = () => {
            // check user credentials
            // handle user login
            // sent from MyGig component
            this.props.loginUser(1);
            // they logged in, now redirect
            this.setState({
                redirect: true
            });
        };

        switchForm = () => {
            this.setState({
               showLogin: !this.state.showLogin
            });
        };

        render() {
            // if no redirect value, take back home
            const { from } = this.props.location.state || "/";
            // if redirect is true, user logged in
            if (this.state.redirect) {
                return <Redirect to={{ pathname: from }} />
            }
            return(
                <div>
                    Login Route
                    <Button onClick={this.handleLogin} innerText={"Login"} />
                    {/* Button to switch form view */}
                    <Button onClick={this.switchForm} innerText={this.state.showLogin ? "Sign Up" : "Login"} />
                </div>
            )
        }
    }
)