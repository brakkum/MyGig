import React from "react";
import MemberPicture from "./MemberPicture";

export default class EnsembleMembersList extends React.Component {
    // map props.ensembleMembers into MemberNameDisplay components

    sendConnectionRequest = memId => {
        let jwt = this.props.jwt;

        fetch("/api/users/newconnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: memId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested");
                } else {
                    console.log("fail, ", json);
                }
            }).catch(e => console.log(e));
    };

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
                                    <MemberPicture
                                        photoUrl={mem.photoUrl}
                                        highlightOnHover={!mem.connectedToUser}
                                        innerHtml={"Connect"}
                                        onClick={!mem.connectedToUser ? () => this.sendConnectionRequest(mem.userId) : null}
                                    />
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
