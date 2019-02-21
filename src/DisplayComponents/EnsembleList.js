import React from "react";
import MembersList from "./MembersList";
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
                            <MembersList ensembleMembers={ens.ensembleMembers} />
                        </div>
                    )
                })
            }
        </div>
    )
}
