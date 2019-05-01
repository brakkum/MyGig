import React from "react";

export default class Progress extends React.Component {

    render() {
        return(
            <progress className="progress" style={{border: "2px solid hsl(0, 0%, 21%)"}} />
        )
    }
}
