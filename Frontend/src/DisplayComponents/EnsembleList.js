import React from "react";
import MemberPicture from "./MemberPicture";

export default class EnsembleList extends React.Component {
    // maps an array of ensembles by using
    // EnsembleName and EnsembleMembersList components

    render() {
        return(
            <div className="ensemble_list">
                {
                    this.props.ensembles.length > 1 && "With"
                }
                {
                    this.props.ensembles.map((ens, i) => {
                        return(
                            <div key={i} className="ensembleListing">
                                <div className="ensemble_name" style={{margin: "10px", fontWeight: "bold"}}>
                                    {ens.name}
                                </div>
                                {
                                    ens.members.map((mem, i) => {
                                        return(
                                            <span
                                                key={i}
                                            >
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
                    })
                }
            </div>
        )
    }
}
