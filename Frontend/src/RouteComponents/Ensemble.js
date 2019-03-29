import React from "react";
import Header from "../DisplayComponents/Header";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    _isMounted = false;

    state = {
        loaded: false,
        ensemble: null
    };

    componentDidMount() {
        const ensembleId = this.props.match.params.ensembleId;
        const jwt = this.props.userData.jwt;
        this._isMounted = true;

        fetch("/api/routes/ensemble", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: ensembleId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success && this._isMounted) {
                    this.setState({ensemble: json.ensemble});
                    this.props.pageLoaded();
                } else {
                    console.log("ensemble fetch fail");
                    this.props.pageLoaded();
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            this.state.ensemble &&
                <div>
                    <Header {...this.state.ensemble} />
                    <CommentSection
                        comments={this.state.ensemble && this.state.ensemble.comments}
                        submitUr={"/api/ensembles/newensemblecomment"}
                        getUrl={"/api/ensembles/getcomments"}
                        jwt={this.props.userData.jwt}
                        id={this.props.match.params.eventId}
                    />
                    <h4>
                        Ensemble Id: {this.props.match.params.ensembleId}
                    </h4>
                </div>
        )
    }
}
