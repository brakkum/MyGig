import React from "react";

export default class Loading extends React.Component {

    render() {
        return(
            <div>
                {
                    this.props.loaded ? this.props.success : this.props.waiting
                }
            </div>
        )
    }
}
