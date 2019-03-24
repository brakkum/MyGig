import React from "react";
import Input from "../HelperComponents/Input";
import Constants from "../Constants/Constants";
import DisplayCase from "../DisplayComponents/Containers/DisplayCase";
import MemberSearchDisplay from "../DisplayComponents/MemberSearchDisplay";

export default class UserSearch extends React.Component{

    state = {
        value: "",
        timeOut: 0,
        users: []
    };

    onChange = text => {
        if (this.state.timeOut) {
            clearTimeout(this.state.timeOut);
        }

        let jwt = this.props.userData.jwt;
        this.setState({
            value: text,
            timeOut: setTimeout(() => {
                if (!this.state.value){
                    return;
                }
                fetch("/api/users/search",
                    {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${jwt}`
                        }),
                        body: JSON.stringify({
                            Search: this.state.value
                        })
                    }
                ).then(res => res.json())
                    .then(json => {
                        if (json.success){
                            console.log(json.users);
                            this.setState({
                                users: json.users
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
        console.log(this.state)
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
                                    jwt={this.props.userData.jwt}
                                    user={user}
                                    key={i}
                                    filterUser={this.filterUser}
                                />
                            )
                        })
                    }
                </DisplayCase>
            </div>
        )
    }
}
