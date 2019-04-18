import UpcomingPerformancesDisplay from "../DisplayComponents/UpcomingPerformancesDisplay";
import EnsembleMemberDisplay from "../DisplayComponents/EnsembleMemberDisplay";
import EnsembleMemberDelete from "../DisplayComponents/EnsembleMemberDeleteDisplay";
import SearchConnections from "../FormComponents/SearchConnections";
import MemberCommentDisplay from "../DisplayComponents/MemberCommentDisplay";
import React from "react";

export default class Ensemble extends React.Component {

    _isMounted = false;

    state = {
        ensembleId: null,
        jwt: null,
        userId: null,
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
                    this.repopulateComments();
                } else {
                    this.setState({
                        sendingRequest: false
                    });
                }
            }).catch(e => {
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    filterOutMember = userId => {
        let members = this.state.members;
        let newMembers = members.filter(mem => mem.userId !== userId);
        this.setState({
            members: []
        });
        this.setState({
            members: newMembers
        });
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
                }
                this.setState({
                    sendingRequest: false
                });
            }).catch(e => {
                this.setState({
                    sendingRequest: false
                });
            }
        )
    };

    componentDidMount() {
        const ensembleId = parseInt(this.props.match.params.ensembleId);
        const jwt = this.props.jwt;
        const userId = this.props.user.userId;
        this.setState({
            ensembleId: ensembleId,
            jwt: jwt,
            userId: userId
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
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
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
                                            return <MemberCommentDisplay
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
                                        return <EnsembleMemberDisplay
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
                                <div className="section">
                                    {this.state.members.map((member, i) => {
                                        if (member.userId === this.state.userId) {
                                            return null;
                                        }
                                        return <EnsembleMemberDelete
                                            key={i}
                                            {...member}
                                            filterOutMember={this.filterOutMember}
                                            jwt={this.state.jwt}
                                            ensembleId={this.state.ensembleId}
                                        />
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
