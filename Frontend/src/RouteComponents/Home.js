import UpcomingPerformancesDisplay from "../DisplayComponents/UpcomingPerformancesDisplay";
import RequestDisplay from "../DisplayComponents/RequestDisplay";
import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";
import Progress from "../DisplayComponents/Progress";

export default class Home extends React.Component {

    _isMounted = false;

    state = {
        isLoading: true,
        ensembles: [],
        requests: [],
        performances: [],
        events: [],
        hideRequests: true,
        hideEnsembles: true,
        hideEvents: true,
        jwt: ""
    };

    componentDidMount() {
        this._isMounted = true;
        const jwt = this.props.jwt;

        this.setState({
            jwt: jwt
        });

        this.updateState(jwt);
    }

    updateState = jwt => {
        fetch("/api/routes/home", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success){
                    this.setState({
                        isLoading: false,
                        ensembles: json.ensembles,
                        requests: json.requests,
                        performances: json.performances,
                        events: json.events
                    });
                }
            }).catch(e => console.log(e));
    };

    filterRequests = (requestType, typeId) => {
        let reqs = this.state.requests;
        let newReqs = reqs.filter(req => req.requestType !== requestType || req.typeId !== typeId);
        this.setState({requests: []});
        this.setState({requests: newReqs});
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const requests = this.state.requests;
        const ensembles = this.state.ensembles;
        const performances = this.state.performances;
        const events = this.state.events;
        return(
            <div className="section">
                {this.state.isLoading ?
                    <Progress />
                :
                    <div>
                        {/* Requests - Full width box, if there are any */}
                        {this.state.requests.length > 0 &&
                            <div className="columns">
                                <div className="column is-12">
                                    <div className="box">
                                        {requests.map((req, i) => {
                                            return <div
                                                className={this.state.hideRequests && i >= 2 ? "is-hidden" : ""}
                                                key={i}
                                            >
                                                <RequestDisplay
                                                    {...req}
                                                    jwt={this.state.jwt}
                                                    updateState={this.updateState}
                                                    filterRequests={this.filterRequests}
                                                    key={i}
                                                />
                                            </div>
                                        })}
                                        {requests.length > 2 &&
                                            <div className="has-text-centered">
                                                <a
                                                    href="#requests"
                                                    onClick={() => this.setState({hideRequests: !this.state.hideRequests})}
                                                >
                                                    {this.state.hideRequests ? "More" : "Less"}
                                                </a>
                                            </div>
                                        }
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
                                            <UpcomingPerformancesDisplay performances={performances} jwt={this.state.jwt} />
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
                                            <Link to="/newEnsemble" className="is-pulled-right">New Ensemble</Link>
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
                                            <Link to="/newEvent" className="is-pulled-right">New Event</Link>
                                            <div>
                                                {events.length > 0 ?
                                                    events.map((event, i) => {
                                                        const userIsMod = event.userIsMod;
                                                        return <div className={i >= 2 && this.state.hideEvents ? "is-hidden" : ""} key={i}>
                                                            <Link to={`/event/${event.eventId}`} key={i}>
                                                                <span className="is-size-4">{event.name}</span>
                                                            </Link>
                                                            &nbsp;
                                                            <span className="is-size-6">
                                                                {moment.utc(event.dateAndTime).local().format("MMM D")},
                                                            </span>
                                                            &nbsp;
                                                            <span className="is-size-6">
                                                                {event.location}
                                                            </span>
                                                            &nbsp;
                                                            <span className="is-size-6 has-text-grey-light">{userIsMod && "Moderator"}</span>
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