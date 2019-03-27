import React from "react";
import Header from "./Header";

export default class EventHeader extends React.Component {
    // extends Header component
    // for event pages

    render() {
        console.log(this.props);
        return(
            <Header {...this.props} />
        )
    }
}
