import moment from "moment";
import React from "react";

export default class TimeSince extends React.Component {

    formatTime = () => {
        const time = this.props.time;
        const now = moment();

        let yearsSince = now.diff(time, "years");
        if (yearsSince >= 1) { return `${yearsSince}y`; }
        let monthsSince = now.diff(time, "months");
        if (monthsSince >= 1) { return `${monthsSince}mo`; }
        let weeksSince = now.diff(time, "weeks");
        if (weeksSince >= 1) { return `${weeksSince}w`; }
        let daysSince = now.diff(time, "days");
        if (daysSince >= 1) { return `${daysSince}d`; }
        let hoursSince = now.diff(time, "hours");
        if (hoursSince >= 1) { return `${hoursSince}h`; }
        let minutesSince = now.diff(time, "minutes");
        if (minutesSince >= 1) { return `${minutesSince}m`; }
        return `${now.diff(time, "seconds")}s`;
    };

    render() {
        return(
            <div>
                {this.formatTime()} ago
            </div>
        )
    }
}
