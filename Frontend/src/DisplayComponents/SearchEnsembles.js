import React from "react";
import Constants from "../Constants/Constants";
import MemberSearchDisplay from "./MemberSearchDisplay";
import EnsembleSearchDisplay from "./EnsembleSearchDisplay";

export default class SearchEnsembles extends React.Component {

    state = {
        search: "",
        timeOut: 0,
        ensembles: [],
        isSearching: false
    };

    onSearchChange = text => {
        if (this.state.timeOut) {
            clearTimeout(this.state.timeOut);
        }

        this.setState({
            search: text,
            timeOut: setTimeout(() => {
                if (!this.state.search){
                    return;
                }
                this.setState({isSearching: true});
                fetch("/api/ensembles/searchEnsemblesNotOnEvent",
                    {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.props.jwt}`
                        }),
                        body: JSON.stringify({
                            Search: text,
                            EventId: this.props.eventId
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
                        this.setState({
                            isSearching: false
                        });
                    }).catch(e => console.log(e));
            }, Constants.searchTimeout)
        });
    };

    render() {
        const ensembles = this.state.ensembles;
        return(
            <div className="section">
                <div className="field" style={{maxWidth: "600px", margin: "auto"}}>
                    <input
                        className="input"
                        value={this.state.search}
                        placeholder="Search Users"
                        onChange={search => this.onSearchChange(search.target.value)}
                    />
                    <div className="section">
                        <div className="box">
                        {this.state.isSearching ?
                            <div>Searching...</div>
                            :
                            ensembles.length > 0 ?
                                ensembles.map((ensemble, i) => {
                                    return <EnsembleSearchDisplay
                                        eventId={this.props.eventId}
                                        jwt={this.props.jwt}
                                        {...ensemble}
                                        key={i}
                                    />
                                })
                                :
                                <div>No Ensembles Found</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
