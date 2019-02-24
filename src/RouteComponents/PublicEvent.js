import React from "react";
import res from "./PublicEventMockData";
import EventHeader from "../DisplayComponents/EventHeader";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";
import { Redirect } from "react-router-dom";

export default class PublicEvent extends React.Component {
    // top level route component for /public_event/{event_id}

    _isMounted = false;

    state = {
        loaded: false,
        data: null,
        userAllowed: true
    };

    componentDidMount() {
        // api call here
        // check that user is allowed
        // redirect if they're not
        // setTimeout to mimic data load
        this._isMounted = true;
        setTimeout(() => {
            if (this._isMounted) {
                this.setState({ data: res.data, loaded: true });
            }
        }, 2000);
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                <h4>
                    Id: {this.props.match.params.eventId}
                </h4>
            </LoadingBuffer>
        )
    }
}
