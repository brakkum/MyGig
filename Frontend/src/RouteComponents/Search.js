import React from "react";
import UserSearch from "../FormComponents/UserSearch";

export default class Search extends React.Component {

    componentDidMount() {
        this.props.pageLoaded();
    }

    render() {
        return(
            <div>
                <UserSearch userData={this.props.userData} />
            </div>
        )
    }
}
