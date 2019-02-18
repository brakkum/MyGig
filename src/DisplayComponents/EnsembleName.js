import React from "react";

export default class EnsembleName extends React.Component {

    render() {
        return(
            <div className="ensemble_name" style={{margin: "10px", fontWeight: "bold"}}>
                {this.props.name}
            </div>
        )
    }
}
