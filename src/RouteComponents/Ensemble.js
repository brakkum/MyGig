import React from "react";
import res from "./EnsembleMockData";
import EnsembleHeader from "../DisplayComponents/EnsembleHeader";
import LoadingBuffer from "../HelperComponents/LoadingBuffer";
import { Redirect } from "react-router-dom";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    state = {
        loaded: false,
        data: null,
        userAllowed: true
    };

    componentDidMount() {
        // api call here
        // check that user is allowed
        // redirect if they're not
        this.setState({ data: res.data, loaded: true });
    }

    render() {
        // if user not allowed, redirect home
        if (!this.state.userAllowed) {
            return <Redirect to={"/"} />
        }
        return(
            <div>
                <LoadingBuffer
                    loaded={this.state.loaded}
                >
                    <EnsembleHeader {...this.state.data} />
                </LoadingBuffer>
                <h4>
                    Ensemble Id: {this.props.match.params.ensembleId}
                </h4>
            </div>
        )
    }
}
