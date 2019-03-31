import React from "react";
import MemberPicture from "./MemberPicture";

export default class EnsembleList extends React.Component {
    // maps an array of ensembles by using
    // EnsembleName and EnsembleMembersList components

    render() {
        return(
            <div className="ensemble_list">
                {
                    this.props.ensembles.length > 0 && <h4>With</h4>
                }
                {
                    this.props.ensembles.map((ens, i) => {
                        return(
                            <div key={i} className="ensembleListing">
                                <div
                                    className="ensemble_name"
                                >
                                    {ens.name}
                                </div>
                                <div
                                    style={{
                                        width: "50%",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center"
                                    }}
                                >
                                    {
                                        ens.members.map((mem, i) => {
                                            return(
                                                <span
                                                    style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        margin: "10px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}
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
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
