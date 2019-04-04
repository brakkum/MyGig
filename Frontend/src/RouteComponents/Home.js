import React from "react";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import Request from "../DisplayComponents/Request";
import Link from "../DisplayComponents/Containers/Link";
import Button from "../HelperComponents/Button";

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
                        events: json.events
                    });
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
                {
                    <DisplayCase
                        labelLeft={"Requests"}
                        labelRight={
                            <Link
                                text={"Find Users"}
                                url={"/search"}
                                redirect={this.props.redirect}
                            />
                        }
                    >
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
                        boxStyle={{display: "flex", justifyContent: "space-around"}}
                    >
                        {this.state.ensembles.length > 0
                            ?
                            this.state.ensembles.map((ens, i) => {
                                return <Button
                                    onClick={() => this.props.redirect(`/ensemble/${ens.ensembleId}`, "/")}
                                    key={i}
                                    preClickText={ens.name}
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
                        boxStyle={{display: "flex", justifyContent: "space-around"}}
                    >
                        {this.state.events.length > 0
                            ?
                            this.state.events.map((ev, i) => {
                                return <Button
                                    onClick={() => this.props.redirect(`/event/${ev.eventId}`, "/")}
                                    key={i}
                                    preClickText={ev.name}
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