import RequestEnsembleForEvent from "../HelperComponents/RequestEnsembleForEvent";
import React from "react";

export default class EnsembleSearchDisplay extends React.Component {

    render() {
        return(
            <div>
                <div className="columns">
                    <div className="column">
                        <h3 className="is-size-3 has-text-centered">
                            {this.props.name}
                        </h3>
                    </div>
                    <div className="column">
                        <RequestEnsembleForEvent
                            ensembleId={this.props.ensembleId}
                            eventId={this.props.eventId}
                            jwt={this.props.jwt}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
