import withRouter from "react-router/es/withRouter";
import React from "react";
import Progress from "../DisplayComponents/Progress";

export default withRouter(
    class Logout extends React.Component {

        componentDidMount() {
            this.props.logoutUser();
            this.props.history.push("/login");
        }

        render() {
            return(
                <div className="section">
                    <Progress />
                </div>
            )
        }
    }
);
