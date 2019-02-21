import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";

export default function Header (props) {

    return(
        <div className="page-header">
            <h1>
                {
                    props.pageHeader
                }
            </h1>
            {
                props.details != null &&
                    <div className="details">
                        <h3>{props.details.location}</h3>
                        <h4>{props.details.time}</h4>
                    </div>
            }
            {
                props.ensembles != null && <EnsemblesList ensembles={props.ensembles} />
            }
            {
                props.ensembleMembers != null && <EnsembleMembersList ensemble_members={props.ensembleMembers} />
            }
        </div>
    )
}
