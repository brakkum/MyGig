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
                        <div key={i} className="ensemble_listing">
                            <EnsembleName name={ens.ensemble_name} />
                            <MembersList ensemble_members={ens.ensemble_members} />
                        </div>
                    )
                })
            }
        </div>
    )
}
