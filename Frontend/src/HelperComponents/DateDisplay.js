import React from "react";
import moment from "moment";

export default class DateDisplay extends React.Component {

    render() {
        return(
            <div style={{margin: "20px"}}>
                <div style={{fontSize: "15pt"}}>
                    { moment(this.props.datetime).format("MMM Do, Y") }
                </div>
                <div style={{fontSize: "20pt"}}>
                    { moment(this.props.datetime).format("h:mm a") }
                </div>
            </div>
        )
    }
}
