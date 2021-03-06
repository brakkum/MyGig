import MemberPhotoAndConnectButtonDisplay from "./MemberPhotoAndConnectButtonDisplay";
import moment from "moment";
import React from "react";

export default class EnsembleMemberDisplay extends React.Component {

    render() {
        return(
            <article className="message is-dark">
                <div className="message-header">
                    {this.props.fullName}
                </div>
                <div className="message-body">
                    <div className="columns">
                        <div className="column">
                            Member since {moment.utc(this.props.memberSince).local().format("MMMM D, YYYY")}
                        </div>
                        <div className="column is-3">
                            <MemberPhotoAndConnectButtonDisplay
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
