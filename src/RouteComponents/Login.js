import React from "react";
import { withRouter, Redirect } from "react-router-dom";

export default withRouter(
    class Login extends React.Component {
        // TODO: create registration component

        state = {
            redirect: false
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
                    <button onClick={this.handleLogin}>
                        login
                    </button>
                </div>
            )
        }
    }
)