import React from "react";
import moment from "moment";

export default class TimeSince extends React.Component {
    // shows formatted time since something occurred
    // props:
    // time: the event that happened

    formatTime = () => {
        let time = this.props.time;

        let yearsSince = moment().diff(time, "years");
        if (yearsSince >= 1) { return `${yearsSince}y`; }
        let monthsSince = moment().diff(time, "months");
        if (monthsSince >= 1) { return `${monthsSince}mo`; }
        let weeksSince = moment().diff(time, "weeks");
        if (weeksSince >= 1) { return `${weeksSince}w`; }
        let daysSince = moment().diff(time, "days");
        if (daysSince >= 1) { return `${daysSince}d`; }
        let hoursSince = moment().diff(time, "hours");
        if (hoursSince >= 1) { return `${hoursSince}h`; }
        let minutesSince = moment().diff(time, "minutes");
        if (minutesSince >= 1) { return `${minutesSince}m`; }
        return `${moment().diff(time, "seconds")}s`;
    };

    render() {
        return(
            <div>
                {this.formatTime()} ago
            </div>
        )
    }
}
