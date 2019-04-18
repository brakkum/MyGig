import MemberPhotoAndConnect from "./MemberPhotoAndConnect";
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
                            Member since {moment(this.props.memberSince).format("MMMM D, YYYY")}
                        </div>
                        <div className="column is-3">
                            <MemberPhotoAndConnect
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
