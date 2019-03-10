import React from "react";
import Header from "./Header";

export default class EnsembleHeader extends React.Component {
    // extends Header component
    // for ensemble pages

    render() {
        return(
            <Header pageHeader={this.props.ensembleName} ensembleMembers={this.props.ensembleMembers} />
        )
    }
}
