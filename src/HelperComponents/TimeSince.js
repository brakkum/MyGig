import React from "react";

export default class TimeSince extends React.Component {
    // shows formatted time since something occurred
    // props:
    // time: the event that happened

    millisecondsToSeconds = time => {
        return Math.floor(time / 1000);
    };

    formatTime = () => {
        let rightNow = this.millisecondsToSeconds(new Date().getTime());
        let then = this.millisecondsToSeconds(new Date(this.props.time).getTime());

        let difference = rightNow - then;

        // yes, this is a bad way to do this
        let minuteSeconds = 60;
        let hourSeconds = minuteSeconds * 60;
        let daySeconds = hourSeconds * 24;
        let weekSeconds = daySeconds * 7;
        let monthSeconds = daySeconds * 31;
        let yearSeconds = daySeconds * 365;

        let yearsSince = Math.floor(difference / yearSeconds);
        if (yearsSince >= 1) { return `${yearsSince}y`; }
        let monthsSince = Math.floor(difference / monthSeconds);
        if (monthsSince >= 1) { return `${monthsSince}m`; }
        let weeksSince = Math.floor(difference / weekSeconds);
        if (weeksSince >= 1) { return `${weeksSince}w`; }
        let daysSince = Math.floor(difference / daySeconds);
        if (daysSince >= 1) { return `${daysSince}d`; }
        let hoursSince = Math.floor(difference / hourSeconds);
        if (hoursSince >= 1) { return `${hoursSince}h`; }
        let minutesSince = Math.floor(difference / minuteSeconds);
        if (minutesSince >= 1) { return `${minutesSince}m`; }
        return `${difference}s`;
    };

    render() {
        return(
            <div style={{marginRight: "10px", fontSize: this.props.size}}>
                {this.formatTime()} ago
            </div>
        )
    }
}
