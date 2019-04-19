import MemberPictureDisplay from "./MemberPictureDisplay";
import moment from "moment";
import React from "react";

export default class ConnectionDisplay extends React.Component {

    state = {
        showConfirm: false,
        jwt: ""
    };

    componentDidMount() {
        const jwt = this.props.jwt;

        this.setState({
            jwt: jwt
        });
    }

    deleteConnection = () => {
        const userId = this.props.userId;

        fetch("/api/users/deleteConnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                UserId: userId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.props.filterConnections(userId);
                }
            }).catch(e => console.log(e));
    };

    render() {
        return(
            <article className="message is-dark">
                <div className="message-header">
                    <h5 className="is-size-5">
                        {this.props.fullName}
                    </h5>
                    <a
                        className="delete"
                        href="#connections"
                        onClick={() => this.setState({showConfirm: !this.state.showConfirm})}
                    >
                        x
                    </a>
                </div>
                <div className="message-body">
                    <div className="columns">
                        <div className="column">
                            <h4 className="is-size-4">
                                Connected since {moment(this.props.confirmedAt).format("MMMM D, YYYY")}
                            </h4>
                            {this.state.showConfirm &&
                                <div className="">
                                    <button className="button is-danger" onClick={() => this.deleteConnection()}>
                                        Confirm Connection Delete
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="column is-3">
                            <MemberPictureDisplay
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
