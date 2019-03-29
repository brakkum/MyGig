import React from "react";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import Request from "../DisplayComponents/Request";
import Link from "../DisplayComponents/Containers/Link";

export default class Home extends React.Component {
    // top level route component for /

    _isMounted = false;

    state = {
        ensembles: [],
        notifications: [],
        requests: [],
        events: []
    };

    componentDidMount() {
        this._isMounted = true;
        let jwt = this.props.userData.jwt;
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
                        ensembles: json.ensembles,
                        notifications: json.notifications,
                        requests: json.requests,
                        event: json.events
                    });
                    console.log(json);
                    this.props.pageLoaded();
                } else {
                    console.log("fail, ", json);
                }
            }).catch(e => console.log(e));
    }

    filterRequests = id => {
        let reqs = this.state.requests;
        let newReqs = reqs.filter(req => req.requestId !== id);
        this.setState({requests: []});
        this.setState({requests: newReqs});
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>
                Home
                {
                    <DisplayCase labelLeft={"Requests"}>
                        {this.state.requests.length > 0
                            ?
                            this.state.requests.map((req, i) => {
                                console.log(req);
                                return <Request
                                    userPhoto={req.userPhoto}
                                    text={req.text}
                                    requestId={req.requestId}
                                    jwt={this.props.userData.jwt}
                                    filterRequests={this.filterRequests}
                                    key={i}
                                />
                            })
                            :
                            <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                                No requests
                            </div>
                        }
                    </DisplayCase>
                }
                {
                    <DisplayCase
                        labelLeft={"Notifications"}
                    >
                        {this.state.notifications.length > 0
                            ?
                            this.state.notifications.map((n, i) => {
                                console.log(n);
                                return <Link
                                    url={n.url}
                                    interior={n.displayMessage}
                                    redirect={this.props.redirect}
                                    key={i}
                                />
                            })
                            :
                            <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                                No notifications
                            </div>
                        }
                    </DisplayCase>
                }
                {
                    <DisplayCase
                        labelLeft={"Ensembles"}
                        labelRight={
                            <Link
                                text={"New Ensemble"}
                                url={"/newensemble"}
                                redirect={this.props.redirect}
                            />
                        }
                    >
                        {this.state.ensembles.length > 0
                            ?
                            this.state.ensembles.map((ens, i) => {
                                console.log(ens);
                                return <Link
                                    url={`/ensemble/${ens.ensembleId}`}
                                    interior={ens.name}
                                    redirect={this.props.redirect}
                                    key={i}
                                />
                            })
                            :
                            <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                                No ensembles
                            </div>
                        }
                    </DisplayCase>
                }
                {
                    <DisplayCase
                        labelLeft={"Events"}
                        labelRight={
                            <Link
                                text={"New Event"}
                                url={"/newevent"}
                                redirect={this.props.redirect}
                            />
                        }
                    >
                        {this.state.events.length > 0
                            ?
                            this.state.events.map((ev, i) => {
                                console.log(ev);
                                return <Link
                                    url={`/event/${ev.eventId}`}
                                    interior={ev.name}
                                    redirect={this.props.redirect}
                                    key={i}
                                />
                            })
                            :
                            <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                                No events
                            </div>
                        }
                    </DisplayCase>
                }
            </div>
        )
    }
}