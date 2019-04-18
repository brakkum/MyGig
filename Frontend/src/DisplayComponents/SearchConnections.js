import React from "react";
import Constants from "../Constants/Constants";
import MemberSearchDisplay from "./MemberSearchDisplay";

export default class SearchConnections extends React.Component {

    state = {
        search: "",
        timeOut: 0,
        users: [],
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
                fetch("/api/users/searchConnectionsNotInEnsemble",
                    {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.props.jwt}`
                        }),
                        body: JSON.stringify({
                            Search: text,
                            EnsembleId: this.props.ensembleId
                        })
                    }
                ).then(res => res.json())
                    .then(json => {
                        if (json.success){
                            let users = json.users;
                            this.setState({
                                users: []
                            });
                            this.setState({
                                users: users
                            });
                        }
                        this.setState({
                            isSearching: false
                        });
                    }).catch(e => console.log(e));
            }, Constants.searchTimeout)
        });
    };


    render() {
        const users = this.state.users;
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
                            {users.length > 0 ?
                                users.map((user, i) => {
                                    return <MemberSearchDisplay
                                        {...user}
                                        type="ensembleMember"
                                        jwt={this.props.jwt}
                                        ensembleId={this.props.ensembleId}
                                        key={i}
                                    />
                                })
                                :
                                this.state.isSearching ?
                                    <div>Searching...</div>
                                    :
                                    <div>No Users Found</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
