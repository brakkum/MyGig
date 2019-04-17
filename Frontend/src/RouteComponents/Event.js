import React from "react";
import Header from "../DisplayComponents/Header";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Event extends React.Component {
    // top level route component for /event/{event_id}

    _isMounted = false;
    _eventId = null;
    _jwt = null;

    state = {
        pageLoading: true,
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
                if (this._isMounted && json.success) {
                    this.setState({event: json.ev});
                } else {
                    console.log("event fetch fail");
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            this.state.pageLoading ?
                <progress className="progress"/>
                :
                <div>
                    <Header
                        jwt={this._jwt}
                        id={this._eventId}
                        {...this.state.event}
                    />
                    <CommentSection
                        id={this._eventId}
                        jwt={this._jwt}
                        comments={this.state.event.comments}
                        submitUrl={"/api/events/neweventcomment"}
                        getUrl={"/api/events/getcomments"}
                    />
                </div>
        )
    }
}
