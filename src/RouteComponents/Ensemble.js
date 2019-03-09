import React from "react";
import res from "../MockData/EnsembleMockData";
import EnsembleHeader from "../DisplayComponents/EnsembleHeader";
import { Redirect } from "react-router-dom";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    _isMounted = false;

    state = {
        loaded: false,
        data: null,
        userAllowed: true
    };

    componentDidMount() {
        // api call here
        // check that user is allowed
        // redirect if they're not
        this._isMounted = true;
        setTimeout(() => {
            if (this._isMounted) {
                this.setState({ data: res.data, loaded: true });
            }
        }, 2000);
        setTimeout(() => {
            this.props.pageLoaded();
        }, 100);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        // if user not allowed, redirect home
        if (!this.state.userAllowed) {
            return <Redirect to={"/"} />
        }
        return(
            this.state.data &&
                <div>
                    <EnsembleHeader {...this.state.data} />
                    <CommentSection
                        comments={this.state.data && this.state.data.ensembleComments}
                    />
                    <h4>
                        Ensemble Id: {this.props.match.params.ensembleId}
                    </h4>
                </div>
        )
    }
}
