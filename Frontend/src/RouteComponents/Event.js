import EnsembleMemberDisplay from "../DisplayComponents/EnsembleMemberDisplay";
import SearchEnsembles from "../DisplayComponents/SearchEnsembles";
import MemberComment from "../DisplayComponents/MemberComment";
import moment from "moment";
import React from "react";
import EnsembleBookingDelete from "../DisplayComponents/EnsembleBookingDelete";
import EventEnsembleDisplay from "../DisplayComponents/EventEnsembleDisplay";

export default class Event extends React.Component {
    // top level route component for /event/{event_id}

    _isMounted = false;

    state = {
        currentTag: "info",
        pageLoading: true,
        dateAndTime: null,
        userIsMod: false,
        newComment: "",
        eventName: "",
        ensembles: [],
        eventId: null,
        location: "",
        comments: [],
        event: null,
        jwt: "",
    };

    addComment = () => {
        if (!this.state.newComment) {
            return;
        }

        this.setState({
            sendingRequest: true
        });

        fetch("/api/events/newComment", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                Text: this.state.newComment,
                EventId: this.state.eventId
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

    repopulateComments = () => {
        fetch("/api/events/getComments", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.jwt}`
            }),
            body: JSON.stringify({
                EventId: this.state.eventId
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

    filterOutEnsemble = ensembleId => {
        let ensembles = this.state.ensembles;
        let newEnsembles = ensembles.filter(ens => ens.ensembleId !== ensembleId);
        this.setState({
            ensembles: []
        });
        this.setState({
            ensembles: newEnsembles
        });
    };

    componentDidMount() {
        const jwt = this.props.userData.jwt;
        const eventId = parseInt(this.props.match.params.eventId);
        this._isMounted = true;
        this.setState({
            jwt: jwt,
            eventId: eventId
        });
        const hash = window.location.hash;
        if (hash) {
            this.setState({currentTag: hash.replace("#", "")});
        }

        fetch("/api/routes/event", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                EventId: eventId
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success) {
                    let event = json.ev;
                    this.setState({
                        dateAndTime: event.dateAndTime,
                        userIsMod: event.userIsMod,
                        ensembles: event.ensembles,
                        comments: event.comments,
                        location: event.location,
                        eventName: event.name,
                        pageLoading: false,
                        event: event
                    });
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const event = this.state.event;
        const ensembles = this.state.ensembles;
        return(
            <div className="section">
                {this.state.pageLoading ?
                    <progress className="progress" />
                    :
                    <div>
                        <h2 className="is-size-2">{event.name}</h2>
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
                                    <li className={this.state.currentTag === "ensembles" ? "is-active" : ""}>
                                        <a
                                            href="#ensembles"
                                            onClick={() => this.setState({currentTag: "ensembles"})}
                                        >
                                            Ensembles
                                        </a>
                                    </li>
                                    {this.state.userIsMod &&
                                        <li className={this.state.currentTag === "addEnsembles" ? "is-active" : ""}>
                                            <a
                                                href="#addEnsembles"
                                                className="has-text-success"
                                                onClick={() => this.setState({currentTag: "addEnsembles"})}
                                            >
                                                Add Ensembles
                                            </a>
                                        </li>
                                    }
                                    {this.state.userIsMod &&
                                    <li className={this.state.currentTag === "removeEnsembles" ? "is-active" : ""}>
                                        <a
                                            href="#removeEnsembles"
                                            className="has-text-danger"
                                            onClick={() => this.setState({currentTag: "removeEnsembles"})}
                                        >
                                            Remove Ensembles
                                        </a>
                                    </li>
                                    }
                                </ul>
                            </div>
                            {this.state.currentTag === "info" &&
                                <div>
                                    <h4 className="is-size-4">Details</h4>
                                    <h3 className="is-size-3">{this.state.eventName}</h3>
                                    <h3 className="is-size-3">{moment(this.state.dateAndTime).format("MMMM D, YYYY, H:MM A")}</h3>
                                    <h3 className="is-size-3">{this.state.location}</h3>
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
                                                eventId={this.state.eventId}
                                                jwt={this.state.jwt}
                                                {...comment}
                                                key={i}
                                            />
                                        })}
                                    </div>
                                </div>
                            }
                            {this.state.currentTag === "ensembles" &&
                                <div>
                                    {ensembles.map((ensemble, i) => {
                                        return <EventEnsembleDisplay
                                            jwt={this.state.jwt}
                                            {...ensemble}
                                            key={i}
                                        />
                                    })}
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "addEnsembles" &&
                                <div>
                                    <SearchEnsembles
                                        jwt={this.state.jwt}
                                        eventId={this.state.eventId}
                                    />
                                </div>
                            }
                            {this.state.userIsMod && this.state.currentTag === "removeEnsembles" &&
                                <div className="section">
                                    {ensembles.map((ensemble, i) => {
                                        return <EnsembleBookingDelete
                                            filterOutEnsemble={this.filterOutEnsemble}
                                            ensembleId={this.state.ensembleId}
                                            eventId={this.state.eventId}
                                            jwt={this.state.jwt}
                                            {...ensemble}
                                            key={i}
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
