import React from "react";
import UserSearch from "../FormComponents/UserSearch";

export default class SearchPage extends React.Component {

    _isMounted = false;
    _jwt = null;

    componentDidMount() {
        this._isMounted = true;
        this._jwt =  this.props.userData.jwt;

        setTimeout(() => {
            this.props.pageLoaded();
        }, 200);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendConnectionRequest = async id => {
        let success = false;

        await fetch("/api/users/newconnection", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested");
                    success = true;
                } else {
                    console.log("fail, ", json);
                    success = false
                }
            }).catch(e => console.log(e));

        return success;
    };

    render() {
        return(
            <div>
                {
                    this._jwt &&
                        <UserSearch
                            jwt={this._jwt}
                            url={"/api/users/search"}
                            buttonFunc={this.sendConnectionRequest}
                            buttonText={"Connect"}
                        />
                }
            </div>
        )
    }
}
