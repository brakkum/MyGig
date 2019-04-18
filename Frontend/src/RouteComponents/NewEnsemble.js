import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(
    class NewEnsemble extends React.Component {

        state = {
            ensembleName: "",
            ensembleNameValid: true,
            sendingRequest: false,
            formError: null
        };

        updateValue = (name, e) => {
            this.setState({
                [name]: e.target.value
            });
        };

        makeEnsemble = e => {
            e.preventDefault();

            let valid = true;
            let ensembleName = this.state.ensembleName;
            if (!ensembleName) {
                this.setState({ensembleNameValid: false});
                valid = false;
            } else {
                this.setState({ensembleNameValid: true});
            }

            if (valid) {
                this.setState({sendingRequest: true});
                let jwt = this.props.userData.jwt;

                fetch("/api/ensembles/newEnsemble", {
                    method: "post",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }),
                    body: JSON.stringify({
                        Name: ensembleName
                    })
                }).then(res => res.json())
                    .then(json => {
                        if (json.success) {
                            this.props.redirect(`/ensemble/${json.ensembleId}`);
                        } else {
                            this.setState({sendingRequest: false});
                        }
                    })
                    .catch(e => console.log(e));
            }
        };

        componentDidMount() {
            //
        }

        render() {
            return(
                <div className="section">
                    <div className="box>">
                        <div className="field">
                            <label className="label">
                                Ensemble Name
                            </label>
                            <input
                                className={"input " + (!this.state.ensembleNameValid && "is-danger")}
                                type="text"
                                value={this.state.ensembleName}
                                onChange={e => this.updateValue("ensembleName", e)}
                            />
                        </div>
                        <div className="field buttons is-right">
                            <button
                                className={"button is-info " + (this.state.sendingRequest && "is-loading")}
                                onClick={e => this.makeEnsemble(e)}
                            >
                                Create Ensemble
                            </button>
                            <button
                                className="button is-warning"
                                onClick={() => this.props.history.push("/")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
);
