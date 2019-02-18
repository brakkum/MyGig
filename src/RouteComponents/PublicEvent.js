import React from "react";
import res from "./PublicEventMockData";
import EventHeader from "../DisplayComponents/EventHeader";

export default class PublicEvent extends React.Component {

    state = {
        loaded: false,
        data: null
    };

    componentDidMount() {
        this.setState({ data: res.data, loaded: true });
    }

    render() {
        return(
            <div>
                {
                    this.state.loaded && <EventHeader {...this.state.data} />
                }
                <h4>
                    Id: {this.props.match.params.eventId}
                </h4>
            </div>
        )
    }
}
