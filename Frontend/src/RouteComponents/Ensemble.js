import React from "react";
import UpcomingPerformancesDisplay from "../DisplayComponents/UpcomingPerformancesDisplay";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    _isMounted = false;
    _ensembleId = null;
    _jwt = null;

    state = {
        pageLoading: true,
        userIsMod: false,
        currentTag: "info",
        ensemble: null,
        members: [],
        comments: [],
        performances: [],
        newComment: ""
    };

    addComment = () => {
        if (!this.state.newComment) {
            return;
        }

        this.setState({
            sendingRequest: true
        });

        fetch("/api/ensembles/newComment", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                Text: this.state.newComment,
                EnsembleId: this._ensembleId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("comment submitted");
                    this.repopulateComments();
                } else {
                    console.log("bad comment request ", json);
                    this.setState({
                        sendingRequest: false
                    });
                }
            }).catch(e => {
                console.log(e);
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    repopulateComments = () => {
        this.setState({
            sendingRequest: true
        });

        fetch("/api/ensembles/getComments", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: this._ensembleId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        comments: json.comments,
                        newComment: ""
                    });
                    console.log("retrieved comments ", json)
                } else {
                    console.log("comments not retrieved ", json)
                }
                this.setState({
                    sendingRequest: false
                });
            }).catch(e => {
                console.log(e);
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    componentDidMount() {
        this._ensembleId = this.props.match.params.ensembleId;
        this._jwt = this.props.userData.jwt;
        this._isMounted = true;
        const hash = window.location.hash;
        if (hash) {
            this.setState({currentTag: hash.replace("#", "")});
        }

        fetch("/api/routes/ensemble", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: this._ensembleId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success && this._isMounted) {
                    const ensemble = json.ensemble;
                    this.setState({
                        userIsMod: ensemble.userIsMod,
                        ensemble: ensemble,
                        comments: ensemble.comments,
                        members: ensemble.members,
                        performances: ensemble.performances,
                        pageLoading: false
                    });
                } else {
                    console.log("ensemble fetch fail, ", json);
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        !this.state.pageLoading && console.log(this.state);
        const ensemble = this.state.ensemble;
        const performances = this.state.performances;
        return(
            <div className="section">
                {this.state.pageLoading ?
                    <progress className="progress" />
                    :
                    <div>
                        <h2 className="is-size-2">{ensemble.name}</h2>
                        <div className="box">
                            <div className="tabs">
                                <ul>
                                    <li className={this.state.currentTag === "info" ? "is-active" : ""}>
                                        <a
                                            href="#info"
                                            onClick={() => this.setState({currentTag: "info"})}
                                        >
                                            Info
                                        </a>
                                    </li>
                                    <li className={this.state.currentTag === "comments" ? "is-active" : ""}>
                                        <a
                                            href="#comments"
                                            onClick={() => this.setState({currentTag: "comments"})}
                                        >
                                            Comments
                                        </a>
                                    </li>
                                    <li className={this.state.currentTag === "members" ? "is-active" : ""}>
                                        <a
                                            href="#members"
                                            onClick={() => this.setState({currentTag: "members"})}
                                        >
                                            Members
                                        </a>
                                    </li>
                                    {this.state.userIsMod &&
                                        <li className={this.state.currentTag === "addMembers" ? "is-active" : ""}>
                                            <a
                                                href="#addMembers"
                                                className="has-text-success"
                                                onClick={() => this.setState({currentTag: "addMembers"})}
                                            >
                                                Add Members
                                            </a>
                                        </li>
                                    }
                                    {this.state.userIsMod &&
                                        <li className={this.state.currentTag === "removeMembers" ? "is-active" : ""}>
                                            <a
                                                href="#removeMembers"
                                                className="has-text-danger"
                                                onClick={() => this.setState({currentTag: "removeMembers"})}
                                            >
                                                Remove Members
                                            </a>
                                        </li>
                                    }
                                </ul>
                            </div>
                            {this.state.currentTag === "info" &&
                                <div>
                                    <span className="is-size-3">Upcoming Performances</span>
                                    {performances.length > 0 ?
                                        <UpcomingPerformancesDisplay performances={performances} jwt={this._jwt} />
                                        :
                                        <h3 className="is-size-3">No upcoming performances</h3>
                                    }
                                </div>
                            }
                            {this.state.currentTag === "comments" &&
                                <div>

                                </div>
                            }
                            {this.state.currentTag === "members" &&
                                <div>
                                    members
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "addMembers" &&
                                <div>
                                    add members
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "removeMembers" &&
                                <div>
                                    remove members
                                </div>
                            }
                            {/*<Header*/}
                            {/*    jwt={this._jwt}*/}
                            {/*    id={this._ensembleId}*/}
                            {/*    redirect={this.props.redirect}*/}
                            {/*    {...this.state.ensemble}*/}
                            {/*/>*/}
                            {/*<CommentSection*/}
                            {/*    id={this._ensembleId}*/}
                            {/*    jwt={this._jwt}*/}
                            {/*    comments={this.state.ensemble.comments}*/}
                            {/*    submitUrl={"/api/ensembles/newensemblecomment"}*/}
                            {/*    getUrl={"/api/ensembles/getcomments"}*/}
                            {/*/>*/}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
