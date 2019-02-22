import React from "react";
import res from "./PublicEventMockData";
import EventHeader from "../DisplayComponents/EventHeader";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";

export default class PublicEvent extends React.Component {
    // top level route component for /public_event/{event_id}

    state = {
        loaded: false,
        data: null
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ data: res.data, loaded: true });
        }, 2000);
    }

    render() {
        return(
            <LoadingBuffer
                loaded={this.state.loaded}
            >
                <EventHeader {...this.state.data} />
                <h4>
                    Id: {this.props.match.params.eventId}
                </h4>
            </LoadingBuffer>
        )
    }
}
