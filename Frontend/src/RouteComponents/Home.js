import React from "react";

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

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>
                Home
                <h4>
                    {
                        this.props.userData && this.props.userData.id
                    }
                </h4>
            </div>
        )
    }
}