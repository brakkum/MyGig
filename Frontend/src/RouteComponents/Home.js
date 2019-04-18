import React from "react";
import { Link } from "react-router-dom";
import Request from "../DisplayComponents/Request";
import UpcomingPerformancesDisplay from "../DisplayComponents/UpcomingPerformancesDisplay";
import moment from "moment";

export default class Home extends React.Component {
    // top level route component for /

    _isMounted = false;
    _jwt = null;

    state = {
        isLoading: true,
        ensembles: [],
        notifications: [],
        requests: [],
        performances: [],
        events: [],
        hideEnsembles: true,
        hideEvents: true
    };

    componentDidMount() {
        this._isMounted = true;
        this._jwt = this.props.userData.jwt;

        fetch("/api/routes/home", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success){
                    this.setState({
                        isLoading: false,
                        ensembles: json.ensembles,
                        notifications: json.notifications,
                        requests: json.requests,
                        performances: json.performances,
                        events: json.events
                    });
                } else {
                    console.log("fail, ", json);
                }
            }).catch(e => console.log(e));
    }

    filterRequests = (requestType, typeId) => {
        let reqs = this.state.requests;
        let newReqs = reqs.filter(req => req.requestType !== requestType && req.typeId !== typeId);
        this.setState({requests: []});
        this.setState({requests: newReqs});
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const ensembles = this.state.ensembles;
        const performances = this.state.performances;
        const events = this.state.events;
        return(
            <div className="section">
                {this.state.isLoading ?
                    <progress className="progress" />
                :
                    <div>
                        {/* Requests - Full width box, if there are any */}
                        {this.state.requests.length > 0 &&
                            <div className="columns">
                                <div className="column is-12">
                                    <div className="box">
                                        {this.state.requests.map((req, i) => {
                                            console.log(req);
                                            return <Request
                                                {...req}
                                                jwt={this._jwt}
                                                filterRequests={this.filterRequests}
                                                key={i}
                                            />
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                        {/* Notifications - Full width box, if there are any */}
                        {this.state.notifications.length > 0 &&
                            <div className="columns">
                                <div className="column is-12">
                                    <div className="box">
                                        {this.state.notifications.map((n, i) => {
                                            console.log(n);
                                            return <Link
                                                to={n.url}
                                                key={i}
                                            >
                                                {n.displayMessage}
                                            </Link>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            performances.length > 0 &&
                                <div className="columns">
                                    <div className="column is-12">
                                        <div className="box">
                                            <span className="is-size-3">Upcoming Performances</span>
                                            <UpcomingPerformancesDisplay performances={performances} jwt={this._jwt} />
                                        </div>
                                    </div>
                                </div>
                        }
                        {
                            <div className="columns">
                                <div className="column is-6">
                                    <div className="box">
                                        <div>
                                            <span className="is-size-3">Ensembles</span>
                                            <Link to="/newEnsemble" className="is-pulled-right">New</Link>
                                        </div>
                                        {ensembles.length > 0 ?
                                            ensembles.map((ens, i) => {
                                                const userIsMod = ens.userIsMod;
                                                return <div className={i >= 2 && this.state.hideEnsembles ? "is-hidden" : ""} key={i}>
                                                    <Link to={`/ensemble/${ens.ensembleId}`} key={i}>
                                                        <span className="is-size-4">{ens.name}</span>
                                                        &nbsp;&nbsp;
                                                        <span className="is-size-6 has-text-grey-light">{userIsMod && "Moderator"}</span>
                                                    </Link>
                                                </div>
                                            })
                                            :
                                            <div>
                                                No Ensembles
                                            </div>
                                        }
                                        {
                                            ensembles.length >= 3 &&
                                            <div className="has-text-centered">
                                                <a
                                                    href="#ensembles"
                                                    onClick={() => this.setState({hideEnsembles: !this.state.hideEnsembles})}
                                                >
                                                    {this.state.hideEnsembles ? "More" : "Less"}
                                                </a>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="column is-6">
                                    <div className="box">
                                        <div>
                                            <span className="is-size-3">Events</span>
                                            <Link to="/newEvent" className="is-pulled-right">New</Link>
                                            <div>
                                                {events.length > 0 ?
                                                    events.map((event, i) => {
                                                        return <div className={i >= 2 && this.state.hideEvents ? "is-hidden" : ""} key={i}>
                                                            <Link to={`/event/${event.eventId}`} key={i}>
                                                                <span className="is-size-4">{event.name}</span>
                                                            </Link>
                                                            &nbsp;
                                                            <span className="is-size-6">
                                                                {moment(event.dateAndTime).format("MMM D")},
                                                            </span>
                                                            &nbsp;
                                                            <span className="is-size-6">
                                                                {event.location}
                                                            </span>
                                                        </div>
                                                    })
                                                    :
                                                    <div>
                                                        No Events
                                                    </div>
                                                }
                                                {
                                                    events.length > 2 &&
                                                        <div className="has-text-centered">
                                                            <a
                                                                href="#events"
                                                                onClick={() => this.setState({hideEvents: !this.state.hideEvents})}
                                                            >
                                                                {this.state.hideEvents ? "More" : "Less"}
                                                            </a>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
        )
    }
}