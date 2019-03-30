import React from "react";
import UserSearch from "../FormComponents/UserSearch";

export default class Search extends React.Component {

    

    componentDidMount() {

        setTimeout(() => {
            this.props.pageLoaded();
        }, 200);
    }

    render() {
        return(
            <div>
                <UserSearch
                    userData={this.props.userData}

                />
            </div>
        )
    }
}
