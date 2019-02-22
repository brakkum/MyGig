import React from "react";
import EventHeader from "../DisplayComponents/EventHeader";
import res from "./PrivateEventMockData";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";

export default class PrivateEvent extends React.Component {
    // top level route component for /event/{event_id}

    state = {
        "data": null,
        "loaded": false
    };

    componentWillMount() {
        // api call here
        this.setState({ "data": res.data, "loaded": true });
    }

    render() {
        return(
            <LoadingBuffer
                loaded={this.state.loaded}
            >
                <EventHeader {...this.state.data} />
                <h4>
                    Event Id: {this.props.match.params.eventId}
                </h4>
            </LoadingBuffer>
        )
    }
}
