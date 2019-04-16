import React from "react";
import { Link } from "react-router-dom";
import Request from "../DisplayComponents/Request";
import UpcomingPerformancesTable from "../DisplayComponents/UpcomingPerformancesTable";
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
        events: []
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
                            <div className="box">
                                {this.state.requests.map((req, i) => {
                                    console.log(req);
                                    return <Request
                                        userPhoto={req.userPhoto}
                                        text={req.text}
                                        requestType={req.requestType}
                                        typeId={req.typeId}
                                        jwt={this._jwt}
                                        filterRequests={this.filterRequests}
                                        key={i}
                                    />
                                })}
                            </div>
                        }
                        {/* Notifications - Full width box, if there are any */}
                        {this.state.notifications.length > 0 &&
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
                        }
                        {
                            performances.length > 0 &&
                            <div className="box">
                                <span className="is-size-3">Upcoming Performances</span>
                                <UpcomingPerformancesTable performances={performances} jwt={this._jwt} />
                            </div>
                        }
                        <div className="columns">
                            <div className="column">
                                <div className="box">
                                    <div>
                                        <span className="is-size-3">Ensembles</span>
                                        <Link to="/newEnsemble" className="is-pulled-right">New</Link>
                                    </div>
                                    <div className="field is-grouped is-grouped-multiline section">
                                        {ensembles.length > 0 ?
                                            ensembles.map((ens, i) => {
                                                const userIsMod = ens.userIsMod;
                                                return <span className="control" key={i}>
                                                    <Link to={"/ensemble/" + ens.ensembleId}>
                                                        <div className="tags has-addons are-medium">
                                                            <span className="tag has-text-weight-semibold is-dark">
                                                                {ens.name}
                                                            </span>
                                                            <span
                                                                className={"tag " + (userIsMod ? "is-info" : "is-dark")}
                                                                dangerouslySetInnerHTML={{__html: (userIsMod ? "Mod" : "&nbsp;")}}
                                                            >
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </span>
                                            })
                                            :
                                            <div>No Ensembles</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <div>
                                        <span className="is-size-3">Events</span>
                                        <Link to="/newEvent" className="is-pulled-right">New</Link>
                                        {
                                            events.map((event, i) => {
                                                return <div key={i}>
                                                    <Link to={`/event/${event.eventId}`} key={i}>
                                                        <h4 className="is-size-4">{event.name}</h4>
                                                    </Link>
                                                    <span className="is-size-5">{moment(event.dateAndTime).format("MMM D")}, </span>
                                                    <span className="is-size-6">{event.location}</span>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}