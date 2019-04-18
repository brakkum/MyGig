import React from "react";
import moment from "moment";
import ConnectToUserButton from "../FormComponents/ConnectToUserButton";
import MemberPicture from "./MemberPicture";

export default class MemberEnsembleDisplay extends React.Component {

    state = {
        jwt: ""
    };

    componentDidMount() {
        this.setState({
            jwt: this.props.jwt
        });
    }

    render() {
        return(
            <article className="message is-dark">
                <div className="message-header">
                    {this.props.fullName}
                </div>
                <div className="message-body">
                    <div className="columns">
                        <div className="column">
                            Member since {moment(this.props.memberSince).format("MMMM D, YYYY")}
                        </div>
                        <div className="column is-3">
                            <MemberPicture {...this.props} />
                            {!this.props.connectedToUser &&
                                <div className="is-hoverable">
                                    <ConnectToUserButton
                                        jwt={this.state.jwt}
                                        id={this.props.userId}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
