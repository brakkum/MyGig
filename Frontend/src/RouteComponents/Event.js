import React from "react";
import Header from "../DisplayComponents/Header";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Event extends React.Component {
    // top level route component for /event/{event_id}


    _isMounted = false;
    _eventId = null;
    _jwt = null;

    state = {
        event: null
    };

    componentDidMount() {
        this._eventId = this.props.match.params.eventId;
        this._jwt = this.props.userData.jwt;
        this._isMounted = true;

        fetch("/api/routes/event", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                EventId: this._eventId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success && this._isMounted) {
                    this.setState({event: json.ev});
                    this.props.pageLoaded();
                } else {
                    console.log("event fetch fail");
                    this.props.pageLoaded();
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            this.state.event &&
                <div>
                    <Header {...this.state.event} />
                    <CommentSection
                        id={this._eventId}
                        jwt={this._jwt}
                        comments={this.state.event.comments}
                        submitUrl={"/api/events/neweventcomment"}
                        getUrl={"/api/events/getcomments"}
                    />
                    <span>
                        Event Id: {this.props.match.params.eventId}
                    </span>
                </div>
        )
    }
}
