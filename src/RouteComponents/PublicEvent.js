import React from "react";
import res from "./PublicEventMockData";
import EventHeader from "../DisplayComponents/EventHeader";
import Loading from "../HelperComponents/Loading";

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
                    <Loading
                        loaded={this.state.loaded}
                        success={
                            <EventHeader {...this.state.data} />
                        }
                        waiting={"loading..."}
                    />
                }
                <h4>
                    Id: {this.props.match.params.eventId}
                </h4>
            </div>
        )
    }
}
