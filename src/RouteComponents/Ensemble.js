import React from "react";

export default class Ensemble extends React.Component {

    render() {
        return(
            <div>
                Ensemble page
                <h4>
                    Ensemble Id: {this.props.match.params.ensembleId}
                </h4>
            </div>
        )
    }
}
