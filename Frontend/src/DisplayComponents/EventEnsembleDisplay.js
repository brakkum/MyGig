import MemberPhotoAndConnectButtonDisplay from "./MemberPhotoAndConnectButtonDisplay";
import React from "react";

export default class EventEnsembleDisplay extends React.Component {

    render() {
        const members = this.props.members;
        return(
            <div className="message">
                <div className="message-header">
                    {this.props.name}
                </div>
                <div className="message-body">
                    <div>
                        {members.map((member, i) => {
                            return <div className="columns is-vcentered" key={i}>
                                <div className="column has-text-centered">
                                    <h3 className="is-size-3">
                                        {member.fullName}
                                    </h3>
                                </div>
                                <div className="column">
                                    <MemberPhotoAndConnectButtonDisplay
                                        jwt={this.props.jwt}
                                        width={"150px"}
                                        {...member}
                                    />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
