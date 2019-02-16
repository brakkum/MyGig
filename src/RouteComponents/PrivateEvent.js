import React from "react";
import Header from "../DisplayComponents/Header";
import data from "./PrivateEventDummy";

export default class PrivateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": null
        }
    }

    componentWillMount() {
        // api call here
        this.setState({"data": data.data});
    }

    render() {
        return(
            <div>
                {
                    this.state.data && <Header {...this.state.data} />
                }
                <h4>
                    Event Id: {this.props.match.params.eventId}
                </h4>
            </div>
        )
    }
}
