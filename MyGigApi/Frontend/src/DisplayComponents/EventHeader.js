import React from "react";
import Header from "./Header";

export default class EventHeader extends React.Component {
    // extends Header component
    // for event pages

    render() {
        return(
            <Header pageHeader={this.props.name} details={this.props.details} ensembles={this.props.ensembles} />
        )
    }
}
