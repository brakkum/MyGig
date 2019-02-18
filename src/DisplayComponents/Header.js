import React from "react";
import EnsemblesList from "./EnsembleList";
import MembersList from "./MembersList";

export default function Header (props) {

    return(
        <div className="page-header">
            <h1>
                {
                    props.page_header
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
                props.ensemble_members != null && <MembersList ensemble_members={props.ensemble_members} />
            }
        </div>
    )
}
