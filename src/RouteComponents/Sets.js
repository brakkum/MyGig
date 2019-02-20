import React from "react";
// import { Redirect } from "react-router";

export default class Sets extends React.Component {
    // top level route component for /sets/{event_id}

    render() {
        /* if user not authorized for this set
        if (true) {
            return <Redirect to="/" />
        }
        */
        return(
            <div>
                Sets page
                <h4>
                    For EventId: { this.props.match.params.eventId }
                </h4>
            </div>
        )
    }
}
