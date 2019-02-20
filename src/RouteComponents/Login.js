import React from "react";
import { withRouter, Redirect } from "react-router-dom";

export default withRouter(
    class Login extends React.Component {

        state = {
            redirect: false
        };

        handleLogin = () => {
            // handle user login
            this.props.loginUser(1);
            this.setState({
                redirect: true
            });
        };

        render() {
            const { from } = this.props.location.state || "/";
            if (this.state.redirect) {
                return <Redirect to={{
                    pathname: from
                }} />
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