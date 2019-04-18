import React from "react";

export default class Connections extends React.Component {

    _isMounted = false;

    state = {
        connections: []
    };

    componentDidMount() {
        this._isMounted = true;
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}
