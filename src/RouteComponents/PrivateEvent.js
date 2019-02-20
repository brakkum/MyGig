import React from "react";
import EventHeader from "../DisplayComponents/EventHeader";
import res from "./PrivateEventMockData";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";

export default class PrivateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": null,
            "loaded": false
        }
    }

    componentWillMount() {
        // api call here
        this.setState({ "data": res.data, "loaded": true });
    }

    render() {
        return(
            <div>
                {
                    <LoadingBuffer
                        loaded={this.state.loaded}
                        success={
                            <EventHeader {...this.state.data} />
                        }
                        waiting={"loading..."}
                    />
                }
                <h4>
                    Event Id: {this.props.match.params.eventId}
                </h4>
            </div>
        )
    }
}
