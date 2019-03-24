import React from "react";

export default class Home extends React.Component {
    // top level route component for /

    state = {
        ensembles: [],
        notifications: [],
        requests: [],
        upcoming: []
    };

    componentDidMount() {

        setTimeout(() => {
            this.props.pageLoaded();
        }, 2000);
    }

    render() {
        return(
            <div>
                Home
                <h4>
                    {
                        this.props.userData && this.props.userData.id
                    }
                </h4>
            </div>
        )
    }
}