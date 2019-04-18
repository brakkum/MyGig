import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

export default withRouter(
    class EnsembleMemberDelete extends React.Component {

        state = {
            showConfirm: false
        };

        toggleShowConfirm = () => {
            this.setState({
                showConfirm: !this.state.showConfirm
            })
        };

        removeMember = userId => {
            fetch("/api/ensembles/removeMember", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.jwt}`
                }),
                body: JSON.stringify({
                    UserIdRecipient: userId,
                    EnsembleId: this.props.ensembleId
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log("user removed");
                        this.props.filterOutMember(userId);
                    } else {
                        console.log("user not removed ", json);
                    }
                }).catch(e => {
                console.log(e);
            })
        };

        render() {
            return(
                <div
                    className="notification"
                >
                    <div>
                        <div className="columns is-vcentered">
                            <div className="column is-size-4">
                                {this.props.fullName}
                            </div>
                            <div className="column">
                                {this.state.showConfirm ?
                                    <div>
                                        <button
                                            className="button is-danger"
                                            onClick={() => this.removeMember(this.props.userId)}
                                        >
                                            Confirm Member Removal
                                        </button>
                                    </div>
                                    :
                                    <span>Member since {moment(this.props.memberSince).format("MMMM D, YYYY")}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <a
                        className="delete"
                        onClick={() => this.toggleShowConfirm()}
                    />
                </div>
            )
        }
    }
);