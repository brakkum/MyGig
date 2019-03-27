import React from "react";
import MemberPicture from "./MemberPicture";

export default class EnsembleMembersList extends React.Component {
    // map props.ensembleMembers into MemberNameDisplay components

    render() {
        return(
            <div className="ensembleMembers">
                {
                    this.props.ensembleMembers.map((mem, i) => {
                        return(
                            <span onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} key={i}>
                                <MemberPicture url={mem.photoUrl} />
                                <span style={this.memberStyle}>
                                    {
                                        mem.fullName
                                    }
                                </span>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}
