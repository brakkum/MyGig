import React from "react";
import Input from "../HelperComponents/Input";
import Constants from "../Constants/Constants";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import MemberSearchDisplay from "../DisplayComponents/MemberSearchDisplay";

export default class UserSearch extends React.Component {
    // User Search
    // API endpoint for searching required via this.props.url
    // additional body data can be passed to this.props.body
    // jwt: this.props.jwt
    // this.props.buttonFunc: async function to be
    // executed on button push

    _jwt = null;

    state = {
        value: "",
        timeOut: 0,
        users: []
    };

    componentDidMount() {
        this._jwt = this.props.jwt
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
                            console.log(json.users);
                            let users = json.users;
                            this.setState({
                                users: []
                            });
                            this.setState({
                                users: users
                            });
                        } else {
                            console.log("search fail");
                        }
                    }).catch(e => console.log(e));
            }, Constants.searchTimeout)
        });
    };

    filterUser = userId => {
        let users = this.state.users.filter(u => u.userId !== userId);
        this.setState({
            users: []
        });
        this.setState({
            users: users
        });
    };

    render() {
        return(
            <div>
                <Input
                    value={this.state.value}
                    placeholder={"Search Users"}
                    onChange={this.onChange}
                    name={"user-search"}
                />
                <DisplayCase maxHeight={"400px"}>
                    {
                        this.state.users.map((user, i) => {
                            return(
                                <MemberSearchDisplay
                                    jwt={this._jwt}
                                    user={user}
                                    key={i}
                                    filterUser={this.filterUser}
                                    buttonFunc={this.props.buttonFunc}
                                />
                            )
                        })
                    }
                </DisplayCase>
            </div>
        )
    }
}
