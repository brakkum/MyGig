import React from "react";
import EnsembleMembersList from "./EnsembleMembersList";
import EnsembleName from "./EnsembleName";

export default class EnsembleList extends React.Component {

    render() {
        return(
            <div className="ensemble_list">
                With
                {
                    this.props.ensembles.map((ens, i) => {
                        return(
                            <div key={i} className="ensembleListing">
                                <EnsembleName name={ens.ensembleName} />
                                <EnsembleMembersList ensembleMembers={ens.ensembleMembers} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
