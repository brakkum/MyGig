import React from "react";

export default class PublicEvent extends React.Component {

    render() {
        return(
            <div>
                Public Event Page
                <h4>
                    Id: {this.props.match.params.eventId}
                </h4>
            </div>
        )
    }
}
