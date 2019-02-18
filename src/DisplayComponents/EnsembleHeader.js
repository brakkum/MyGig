import React from "react";
import Header from "./Header";

export default class EnsembleHeader extends React.Component {


    render() {
        return(
            <Header page_header={this.props.ensemble_name} ensemble_members={this.props.ensemble_members} />
        )
    }
}
