import React from "react";
import MemberNameDisplay from "./MemberNameDisplay";

export default class EnsembleMembersList extends React.Component {
    // map props.ensembleMembers into MemberNameDisplay components

    render() {
        return(
            <div className="ensembleMembers">
                {
                    this.props.ensembleMembers.map((mem, i) => {
                        return <MemberNameDisplay memberData={mem} key={i} />
                    })
                }
            </div>
        )
    }
}
