import RequestUserForEnsembleButton from "../Buttons/RequestUserForEnsembleButton";
import ConnectToUserButton from "../Buttons/ConnectToUserButton";
import MemberPictureDisplay from "./MemberPictureDisplay";
import React from "react";

export default class MemberSearchDisplay extends React.Component {

    render() {
        return(
            <div>
                <div className="columns">
                    <div className="column">
                        <MemberPictureDisplay
                            photoUrl={this.props.photoUrl}
                            width={"150px"}
                        />
                    </div>
                    <div className="column">
                        <h3 className="is-size-3 has-text-centered">
                            {this.props.fullName}
                        </h3>
                        {this.props.type === "connection" ?
                            <ConnectToUserButton
                                userId={this.props.userId}
                                jwt={this.props.jwt}
                            />
                            : ""
                        }
                        {this.props.type === "ensembleMember" ?
                            <RequestUserForEnsembleButton
                                userId={this.props.userId}
                                jwt={this.props.jwt}
                                ensembleId={this.props.ensembleId}
                            />
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}
