import React from "react";
import Header from "./Header";

export default class EnsembleHeader extends React.Component {

    render() {
        return(
            <Header pageHeader={this.props.ensembleName} ensembleMembers={this.props.ensembleMembers} />
        )
    }
}
