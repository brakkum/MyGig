import React from "react";

export default function MembersList(props) {

    return(
        <div className="ensembleMembers">
            {
                props.ensembleMembers.map(mem => {
                    return mem.name
                }).join(", ")
            }
        </div>
    )
}
