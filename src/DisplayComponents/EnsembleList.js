import React from "react";

export default function EnsembleList (props) {

    return(
        <div className="ensembleList">
            With
            {
                props.ensembles.map((ens, i) => {
                    return(
                        <div key={i}>
                            <span className="ensName">
                                {ens.name}
                            </span>
                            <span className="ensMembers">
                            {
                                ens.members.map(mem => {
                                    return mem.name
                                }).join(", ")
                            }
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
