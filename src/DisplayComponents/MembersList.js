import React from "react";

export default function MembersList(props) {

    return(
        <div className="ensemble_members">
            {
                props.ensemble_members.map(mem => {
                    return mem.name
                }).join(", ")
            }
        </div>
    )
}
