import withRouter from "react-router/es/withRouter";
import React from "react";

export default withRouter(
    class Logout extends React.Component {

        componentDidMount() {
            this.props.logoutUser();
            this.props.history.push("/login");
        }

        render() {
            return(
                <div className="section">
                    <progress className="progress" />
                </div>
            )
        }
    }
);
