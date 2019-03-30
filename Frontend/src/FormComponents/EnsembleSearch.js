import React from "react";
import Input from "../HelperComponents/Input";
import Constants from "../Constants/Constants";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import EnsembleSearchDisplay from "../DisplayComponents/EnsembleSearchDisplay";

export default class EnsembleSearch extends React.Component {
    // Ensemble Search
    // API endpoint for searching required via this.props.url
    // additional body data can be passed to this.props.body
    // jwt: this.props.jwt
    // this.props.buttonFunc: async function to be
    // executed on button push

    _jwt = null;

    state = {
        value: "",
        timeOut: 0,
        ensembles: []
    };

    componentDidMount() {
        this._jwt = this.props.jwt;
    }

    onChange = text => {
        if (this.state.timeOut) {
            clearTimeout(this.state.timeOut);
        }

        this.setState({
            value: text,
            timeOut: setTimeout(() => {
                if (!this.state.value){
                    return;
                }
                fetch(this.props.url,
                    {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this._jwt}`
                        }),
                        body: JSON.stringify({
                            Search: this.state.value,
                            ...this.props.body
                        })
                    }
                ).then(res => res.json())
                    .then(json => {
                        if (json.success){
                            console.log(json.ensembles);
                            let ensembles = json.ensembles;
                            this.setState({
                                ensembles: []
                            });
                            this.setState({
                                ensembles: ensembles
                            });
                        } else {
                            console.log("search fail");
                        }
                    }).catch(e => console.log(e));
            }, Constants.searchTimeout)
        });
    };

    filterEnsemble = ensembleId => {
        let ensembles = this.state.ensembles.filter(u => u.ensembleId !== ensembleId);
        this.setState({
            ensembles: []
        });
        this.setState({
            ensembles: ensembles
        });
    };

    render() {
        return(
            this._jwt &&
                <div>
                    <Input
                        value={this.state.value}
                        placeholder={"Search Ensembles"}
                        onChange={this.onChange}
                        name={"ensemble-search"}
                    />
                    <DisplayCase maxHeight={"400px"}>
                        {
                            this.state.ensembles.map((ensemble, i) => {
                                return(
                                    <EnsembleSearchDisplay
                                        jwt={this._jwt}
                                        ensemble={ensemble}
                                        key={i}
                                        filterEnsemble={this.filterEnsemble}
                                        buttonFunc={this.props.buttonFunc}
                                        buttonText={this.props.buttonText}
                                    />
                                )
                            })
                        }
                    </DisplayCase>
                </div>
        )
    }
}
