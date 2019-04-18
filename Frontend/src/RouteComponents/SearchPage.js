import React from "react";
import Constants from "../Constants/Constants";
import MemberSearchDisplay from "../DisplayComponents/MemberSearchDisplay";

export default class SearchPage extends React.Component {

    _isMounted = false;

    state = {
        jwt: "",
        search: "",
        users: [],
        timeOut: 0,
        isSearching: false
    };

    componentDidMount() {
        this._isMounted = true;

        this.setState({
            jwt: this.props.userData.jwt
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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
                fetch("/api/users/search",
                    {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.state.jwt}`
                        }),
                        body: JSON.stringify({
                            Search: this.state.search
                        })
                    }
                ).then(res => res.json())
                    .then(json => {
                        if (this._isMounted && json.success){
                            let users = json.users;
                            this.setState({
                                users: users,
                                isSearching: false
                            });
                        }
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
                                        type="connection"
                                        jwt={this.state.jwt}
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
