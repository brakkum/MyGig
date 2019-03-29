import React from "react";
import Header from "../DisplayComponents/Header";
import CommentSection from "../DisplayComponents/CommentSection";

export default class Ensemble extends React.Component {
    // top level route component for /ensemble/{ensemble_id}

    _isMounted = false;
    _ensembleId = null;
    _jwt = null;

    state = {
        ensemble: null,
        ensembleId: null
    };

    componentDidMount() {
        this._ensembleId = this.props.match.params.ensembleId;
        this._jwt = this.props.userData.jwt;
        this._isMounted = true;

        fetch("/api/routes/ensemble", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                EnsembleId: this._ensembleId
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
                        submitUrl={"/api/ensembles/newensemblecomment"}
                        getUrl={"/api/ensembles/getcomments"}
                        jwt={this._jwt}
                        id={this._ensembleId}
                    />
                    <h4>
                        Ensemble Id: {this.props.match.params.ensembleId}
                    </h4>
                </div>
        )
    }
}
