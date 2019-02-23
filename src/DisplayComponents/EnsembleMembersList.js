import React from "react";
import UserNameDisplay from "./UserNameDisplay";

export default class EnsembleMembersList extends React.Component {
    // map props.ensembleMembers into UserNameDisplay components

    render() {
        return(
            <div className="ensembleMembers">
                {
                    this.props.ensembleMembers.map((mem, i) => {
                        return <UserNameDisplay memberData={mem} key={i} />
                    })
                }
            </div>
        )
    }
}
