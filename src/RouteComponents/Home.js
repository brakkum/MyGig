import React from "react";

export default class Home extends React.Component {
    // top level route component for /

    render() {
        return(
            <div>
                Home
                <h4>
                    {
                        this.props.userData.id
                    }
                </h4>
            </div>
        )
    }
}