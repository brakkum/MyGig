import React from "react";
import UserNameDisplay from "./UserNameDisplay";

export default class EnsembleMembersList extends React.Component {

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
