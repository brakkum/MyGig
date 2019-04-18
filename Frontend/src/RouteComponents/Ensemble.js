import UpcomingPerformancesDisplay from "../DisplayComponents/UpcomingPerformancesDisplay";
import MemberEnsembleDisplay from "../DisplayComponents/MemberEnsembleDisplay";
import MemberComment from "../DisplayComponents/MemberComment";
import React from "react";
import SearchConnections from "../DisplayComponents/SearchConnections";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    _isMounted = false;

    state = {
        ensembleId: null,
        jwt: null,
        pageLoading: true,
        userIsMod: false,
        currentTag: "info",
        ensemble: null,
        members: [],
        comments: [],
        performances: [],
        newComment: "",
        sendingRequest: false
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
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                Text: this.state.newComment,
                EnsembleId: this.state.ensembleId
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
        fetch("/api/ensembles/getComments", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: this.state.ensembleId
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
        const ensembleId = parseInt(this.props.match.params.ensembleId);
        const jwt = this.props.userData.jwt;
        this.setState({
            ensembleId: ensembleId,
            jwt: jwt
        });
        this._isMounted = true;
        const hash = window.location.hash;
        if (hash) {
            this.setState({currentTag: hash.replace("#", "")});
        }

        fetch("/api/routes/ensemble", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: ensembleId
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
                                        <UpcomingPerformancesDisplay performances={performances} jwt={this.state.jwt} />
                                        :
                                        <h4 className="is-size-4">No upcoming performances</h4>
                                    }
                                </div>
                            }
                            {this.state.currentTag === "comments" &&
                                <div>
                                    <div className="columns is-vcentered">
                                        <div
                                            className="column"
                                        >
                                            <textarea
                                                className="textarea"
                                                rows="3"
                                                placeholder="Add a new comment"
                                                value={this.state.newComment}
                                                onChange={e => this.setState({newComment: e.target.value})}
                                            />
                                        </div>
                                        <div className="column field is-3 is-grouped is-grouped-centered">
                                            <button
                                                className={"button is-info" +
                                                (this.state.sendingRequest ? " is-loading" : "")}
                                                onClick={() => this.addComment()}
                                            >
                                                Add Comment
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {this.state.comments.map((comment, i) => {
                                            return <MemberComment
                                                {...comment}
                                                jwt={this.state.jwt}
                                                key={i}
                                            />
                                        })}
                                    </div>
                                </div>
                            }
                            {this.state.currentTag === "members" &&
                                <div>
                                    {this.state.members.map((member, i) => {
                                        return <MemberEnsembleDisplay
                                            {...member}
                                            jwt={this.state.jwt}
                                            key={i}
                                        />
                                    })}
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "addMembers" &&
                                <div>
                                    <SearchConnections
                                        jwt={this.state.jwt}
                                        ensembleId={this.state.ensembleId}
                                    />
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "removeMembers" &&
                                <div>
                                    remove members
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
