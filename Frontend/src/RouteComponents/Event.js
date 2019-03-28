import React from "react";
import Header from "../DisplayComponents/Header";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Event extends React.Component {
    // top level route component for /event/{event_id}

    state = {
        event: null
    };

    componentDidMount() {
        const eventId = this.props.match.params.eventId;
        const jwt = this.props.userData.jwt;

        fetch("/api/routes/event", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                EventId: eventId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({event: json.ev});
                    this.props.pageLoaded();
                } else {
                    console.log("event fetch fail");
                    this.props.pageLoaded();
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        return(
            this.state.event &&
                <div>
                    <Header {...this.state.event} />
                    <CommentSection
                        comments={this.state.event.comments}
                        id={this.state.event.eventId}
                        jwt={this.props.userData.jwt}
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
