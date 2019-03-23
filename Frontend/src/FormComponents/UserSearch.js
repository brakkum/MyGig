import React from "react";
import Input from "../HelperComponents/Input";
import Constants from "../Constants/Constants";

export default class UserSearch extends React.Component{

    state = {
        value: "",
        focused: false,
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
                        if (this.state.focused && json.success){
                            console.log(json.users)
                        } else {
                            console.log("search fail");
                        }
                    }).catch(e => console.log(e));
            }, Constants.searchTimeout)
        });
    };

    onFocus = () => {
        this.setState({
            focused: true
        });
    };

    onBlur = () => {
        this.setState({
            focused: false
        })
    };

    render() {
        return(
            <div>
                <Input
                    value={this.state.value}
                    placeholder={"Search Users"}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name={"user-search"}
                />
                {
                    this.state.users.map((user, i) => {
                        return <div>{user}</div>;
                    })
                }
            </div>
        )
    }
}
