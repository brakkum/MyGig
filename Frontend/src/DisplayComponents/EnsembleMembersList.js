import React from "react";
import MemberPicture from "./MemberPicture";

export default class EnsembleMembersList extends React.Component {
    // map props.ensembleMembers into MemberNameDisplay components

    render() {
        return(
            <div className="header">
                Members
                <div className="ensembleMembers"
                    style={{
                        minWidth: "50%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}
                >
                    {
                        this.props.ensembleMembers.map((mem, i) => {
                            return(
                                <div
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
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
