import MemberPictureDisplay from "./MemberPictureDisplay";
import moment from "moment";
import React from "react";

export default class ConnectionDisplay extends React.Component {

    render() {
        return(
            <article className="message is-dark">
                <div className="message-header">
                    <h5 className="is-size-5">
                        {this.props.fullName}
                    </h5>
                </div>
                <div className="message-body">
                    <div className="columns">
                        <div className="column">
                            <h4 className="is-size-4">
                                Connected since {moment(this.props.confirmedAt).format("MMMM D, YYYY")}
                            </h4>
                        </div>
                        <div className="column is-3">
                            <MemberPictureDisplay
                                {...this.props}
                            />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
