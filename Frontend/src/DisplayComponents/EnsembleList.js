import React from "react";
import EnsembleMembersList from "./EnsembleMembersList";
import EnsembleName from "./EnsembleName";

export default class EnsembleList extends React.Component {
    // maps an array of ensembles by using
    // EnsembleName and EnsembleMembersList components

    render() {
        return(
            <div className="ensemble_list">
                With
                {
                    this.props.ensembles.map((ens, i) => {
                        return(
                            <div key={i} className="ensembleListing">
                                <EnsembleName ensembleName={ens.ensembleName} />
                                <EnsembleMembersList ensembleMembers={ens.ensembleMembers} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
