import React from "react";

export default class RequestEnsembleForEventButton extends React.Component {

    _isMounted = false;

    state = {
        sendingRequest: false,
        requestSent: false
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendEnsembleRequest = () => {
        this.setState({sendingRequest: true});
        fetch("/api/events/requestBooking", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: this.props.ensembleId,
                EventId: this.props.eventId
            })
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success){
                    this.setState({
                        requestSent: true
                    });
                    if (this.props.userIsMod) {
                        this.props.populateState(this.props.jwt, this.props.eventId);
                    }
                }
                this.setState({
                    sendingRequest: false
                });
            }).catch(e => console.log(e));
    };

    render() {
        return(
            <div
                className="is-hoverable has-text-centered"
                style={{margin: "10px"}}
            >
                <button
                    className={
                        "button " +
                        "is-small " +
                        (this.state.sendingRequest ? "is-loading " : "") +
                        (this.state.requestSent ? "is-success " : "is-info ")
                    }
                    onClick={() => this.sendEnsembleRequest()}
                >
                    {this.state.requestSent ? "Requested" : "Request Ensemble for Event"}
                </button>
            </div>
        )
    }
}
