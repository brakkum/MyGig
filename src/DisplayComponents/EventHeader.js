import React from "react";
import Header from "./Header";

export default class EventHeader extends React.Component {

    render() {
        return(
            <Header page_header={this.props.name} details={this.props.details} ensembles={this.props.ensembles} />
        )
    }
}
