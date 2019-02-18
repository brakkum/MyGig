import React from "react";
import res from "./EnsembleMockData";
import EnsembleHeader from "../DisplayComponents/EnsembleHeader";
import EnsembleName from "../DisplayComponents/EnsembleName";

export default class Ensemble extends React.Component {

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
                    this.state.loaded && <EnsembleHeader {...this.state.data} />
                }
                <h4>
                    Ensemble Id: {this.props.match.params.ensembleId}
                </h4>
            </div>
        )
    }
}
