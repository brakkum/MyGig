import ConnectToUserButton from "../Buttons/ConnectToUserButton";
import TimeSince from "../HelperComponents/TimeSince";
import MemberPictureDisplay from "./MemberPictureDisplay";
import React from "react";

export default class MemberCommentDisplay extends React.Component {

    state = {
        jwt: ""
    };

    componentDidMount() {
        this.setState({
            jwt: this.props.jwt
        });
    }

    render() {
        const user = this.props.user;
        return(
            <article
                className="message is-dark"
                style={{border: "1px solid lightgrey", borderTop: "0"}}
            >
                <div className="message-body">
                    <div className="columns">
                        <div className="column is-10" style={{position: "relative"}}>
                            <div>{this.props.text}</div>
                            <div
                                className="is-hidden-mobile"
                                style={{position: "absolute", bottom: "0"}}
                            >
                                <TimeSince time={this.props.timestamp} />
                            </div>
                        </div>
                        <div
                            className="column is-hidden-desktop is-hidden-tablet"
                        >
                            <TimeSince time={this.props.timestamp} />
                        </div>
                        <div className="column">
                            <div className="has-text-centered">
                                <h5 className="is-size-5">{user.fullName}</h5>
                                <MemberPictureDisplay {...user} />
                                {!user.connectedToUser &&
                                    <div className="is-hoverable">
                                        <ConnectToUserButton
                                            jwt={this.state.jwt}
                                            userId={user.userId}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
