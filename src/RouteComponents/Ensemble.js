import React from "react";
import res from "./EnsembleMockData";
import EnsembleHeader from "../DisplayComponents/EnsembleHeader";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    state = {
        loaded: false,
        data: null
    };

    componentDidMount() {
        this.setState({ data: res.data, loaded: true });
    }

    render() {
        return(
            <div>
                {
                    <LoadingBuffer
                        loaded={this.state.loaded}
                        success={
                            <EnsembleHeader {...this.state.data} />
                        }
                    />
                }
                <h4>
                    Ensemble Id: {this.props.match.params.ensembleId}
                </h4>
            </div>
        )
    }
}
