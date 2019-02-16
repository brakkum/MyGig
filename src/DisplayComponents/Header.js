import React from "react";
import EnsemblesList from "./EnsembleList";

export default function Header (props) {
    return(
        <div className="header">
            <h1>
                {props.data.name}
            </h1>
            {
                props.data.details != null &&
                    <div className="details">
                        <h3>{props.data.details.location}</h3>
                        <h4>{props.data.details.time}</h4>
                    </div>
            }
            {
                props.data.ensembles != null && <EnsemblesList ensembles={props.data.ensembles} />
            }
        </div>
    )
}
