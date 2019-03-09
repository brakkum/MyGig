import React from "react";

export default class Notifications extends React.Component {
    // top level route component for /notifications

    componentDidMount() {
        setTimeout(() => {
            this.props.pageLoaded();
        }, 100)
    }

    render() {
        return(
            <div>
                Notifications Page
            </div>
        )
    }
}
