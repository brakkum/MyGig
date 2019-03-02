import React from "react";
import EventHeader from "../DisplayComponents/EventHeader";
import res from "../MockData/PrivateEventMockData";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";
import { Redirect } from "react-router-dom";
import CommentSection from "../DisplayComponents/CommentSection";

export default class PrivateEvent extends React.Component {
    // top level route component for /event/{event_id}

    state = {
        "data": null,
        "loaded": false,
        "userAllowed": true
    };

    componentDidMount() {
        // api call here
        // check that user is allowed
        // redirect if they're not
        this.setState({ "data": res.data, "loaded": true });
    }

    render() {
        // if user not allowed, redirect home
        if (!this.state.userAllowed) {
            return <Redirect to={"/"} />
        }
        return(
            // wait for api data to load page
            <LoadingBuffer
                loaded={this.state.loaded}
            >
                <EventHeader {...this.state.data} />
                <CommentSection
                    comments={this.state.data && this.state.data.eventComments}
                />
                <h4>
                    Event Id: {this.props.match.params.eventId}
                </h4>
            </LoadingBuffer>
        )
    }
}
