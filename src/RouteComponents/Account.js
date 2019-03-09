import React from "react";

export default class Account extends React.Component {
    // top level route component for /account

    componentDidMount() {
        setTimeout(() => {
            this.props.pageLoaded();
        }, 100);
    }

    render() {
        return(
            <div>
                Account Page
            </div>
        )
    }
}
