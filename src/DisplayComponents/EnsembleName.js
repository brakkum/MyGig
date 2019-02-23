import React from "react";

export default class EnsembleName extends React.Component {
    // display props.ensembleName for ensemble

    render() {
        return(
            <div className="ensemble_name" style={{margin: "10px", fontWeight: "bold"}}>
                {this.props.ensembleName}
            </div>
        )
    }
}
