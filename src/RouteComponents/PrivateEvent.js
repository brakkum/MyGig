import React from "react";
import EventHeader from "../DisplayComponents/EventHeader";
import res from "./PrivateEventMockData";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";
import { Redirect } from "react-router-dom";
import DisplayCase from "../DisplayComponents/DisplayCase";

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
                <DisplayCase>
                    <h1>hello</h1>
                    <h1>there</h1>
                </DisplayCase>
                <h4>
                    Event Id: {this.props.match.params.eventId}
                </h4>
            </LoadingBuffer>
        )
    }
}
