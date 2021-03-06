import RequestEnsembleForEventButton from "../Buttons/RequestEnsembleForEventButton";
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
                        <RequestEnsembleForEventButton
                            {...this.props}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
