import React from "react";
import EnsembleMembersList from "./EnsembleMembersList";
import EnsembleName from "./EnsembleName";

export default function EnsembleList (props) {

    return(
        <div className="ensemble_list">
            With
            {
                props.ensembles.map((ens, i) => {
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
