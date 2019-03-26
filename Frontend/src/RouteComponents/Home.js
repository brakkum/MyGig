import React from "react";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import Request from "../DisplayComponents/Request";

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
                    this.state.requests.length > 0 &&
                        <DisplayCase label={"Requests"} backgroundColor={"transparent"}>
                            {this.state.requests.map((req, i) => {
                                console.log(req);
                                return <Request
                                    userPhoto={req.userPhoto}
                                    text={req.text}
                                    requestId={req.requestId}
                                    key={i}
                                    jwt={this.props.userData.jwt}
                                    filterRequests={this.filterRequests}
                                />
                            })}
                        </DisplayCase>
                }
            </div>
        )
    }
}