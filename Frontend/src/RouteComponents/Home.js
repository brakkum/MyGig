import React from "react";
import { Link } from "react-router-dom";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import Request from "../DisplayComponents/Request";
import EventDisplay from "../DisplayComponents/EventDisplay";

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
                        ensembles: json.ensembles,
                        notifications: json.notifications,
                        requests: json.requests,
                        performances: json.performances,
                        events: json.events
                    });
                    this.props.pageLoaded();
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
        return(
            <div className="section">
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
                                url={n.url}
                                interior={n.displayMessage}
                                redirect={this.props.redirect}
                                key={i}
                            />
                        })}
                    </div>
                }
                <div className="columns">
                    <div className="column">
                        {/* put ensembles or events here */}
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
                                    this.state.isLoading ? <progress className="progress" /> : "No Ensembles"
                                }
                            </div>
                        </div>
                            {/*<DisplayCase*/}
                            {/*    labelLeft={"Ensembles"}*/}
                            {/*    labelRight={*/}
                            {/*        "n/a"*/}
                            {/*    }*/}
                            {/*    boxStyle={{display: "flex", justifyContent: "space-around"}}*/}
                            {/*>*/}
                            {/*    {this.state.ensembles.length > 0*/}
                            {/*        ?*/}
                            {/*        this.state.ensembles.map((ens, i) => {*/}
                            {/*            return <Button*/}
                            {/*                onClick={() => this.props.redirect(`/ensemble/${ens.ensembleId}`, "/")}*/}
                            {/*                key={i}*/}
                            {/*                preClickText={ens.name}*/}
                            {/*            />*/}
                            {/*        })*/}
                            {/*        :*/}
                            {/*        <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>*/}
                            {/*            No ensembles*/}
                            {/*        </div>*/}
                            {/*    }*/}
                            {/*</DisplayCase>*/}
                    </div>
                    <div className="column">
                    {
                        <DisplayCase
                            labelLeft={"Upcoming Performances"}
                        >
                            {this.state.performances.length > 0
                                ?
                                this.state.performances.map((perf, i) => {
                                    return <EventDisplay
                                        {...perf}
                                        jwt={this._jwt}
                                        redirect={this.props.redirect}
                                        key={i}
                                    />
                                })
                                :
                                <div style={{display: "flex", justifyContent: "center", padding: "20px"}}>
                                    No Upcoming Performances
                                </div>
                            }
                        </DisplayCase>
                    }
                    {
                        <DisplayCase
                            labelLeft={"Events"}
                            labelRight={
                                "/newEvent"
                            }
                        >
                            {this.state.events.length > 0
                                ?
                                this.state.events.map((ev, i) => {
                                    return <EventDisplay
                                        {...ev}
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
                </div>
            {/* put upcoming performances down here */}
            </div>
        )
    }
}