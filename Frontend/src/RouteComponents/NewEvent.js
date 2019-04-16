import React from "react";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { withRouter } from "react-router-dom";
import moment from "moment";

export default withRouter(
    class NewEvent extends React.Component {

        state = {
            name: "",
            nameValid: true,
            location: "",
            locationValid: true,
            date: null,
            dateValid: true,
            sendingRequest: false,
            formError: ""
        };

        componentDidMount() {
            // Set default date to the next
            // occurring Friday at 8 PM
            const friday = 5;
            const today = moment().isoWeekday();
            let nextOccurringFriday;

            if (today <= friday) {
                nextOccurringFriday = moment({hours: 20}).isoWeekday(friday);
            } else {
                nextOccurringFriday = moment({hours: 20}).add(1, "week").isoWeekday(friday).hour(18);
            }
            this.setState({date: nextOccurringFriday.toDate()})
        }

        updateValue = (name, e) => {
            this.setState({
                [name]: e.target.value
            });
        };

        makeEvent = () => {
            let valid = true;
            let errors = [];

            if (this.state.name === "") {
                this.setState({nameValid: false});
                valid = false;
                errors.push("Name Required");
            } else {
                this.setState({nameValid: true});
            }
            if (this.state.location === "") {
                this.setState({locationValid: false});
                valid = false;
                errors.push("Location Required");
            } else {
                this.setState({locationValid: true});
            }
            if (!this.state.date) {
                this.setState({dateValid: false});
                valid = false;
                errors.push("Date Required");
            } else {
                this.setState({dateValid: true});
            }

            if (!valid) {
                this.setState({formError: errors[0]});
                return;
            }

            this.setState({sendingRequest: true});
            let jwt = this.props.userData.jwt;

            fetch("/api/events/newevent", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }),
                body: JSON.stringify({
                    Name: this.state.name,
                    Location: this.state.location,
                    DateAndTime: this.state.dateAndTime
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.redirect(`/event/${json.eventId}`);
                    } else {
                        this.setState({sendingRequest: false});
                    }
                })
            .catch(e => console.log(e));
        };

        render() {
            let date = this.state.date;
            return(
                <div className="section">
                    <div className="field">
                        <label className="label">
                            Event Name
                        </label>
                        <input
                        value={this.state.name}
                        className={"input " + (!this.state.nameValid && "is-danger")}
                        onChange={e => this.updateValue("name", e)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">
                            Event Location
                        </label>
                        <input
                            value={this.state.location}
                            className={"input " + (!this.state.locationValid && "is-danger")}
                            onChange={e => this.updateValue("location", e)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">
                            Date and Time
                        </label>
                        <Flatpickr
                            className="input"
                            options={{enableTime: true, time_24hr: false}}
                            value={date}
                            onChange={date => this.setState({date})}
                        />
                    </div>
                    <div className="field columns">
                        <div className="column">
                            {this.state.formError}
                        </div>
                        <div className="column buttons is-pulled-right">
                            <button
                                onClick={this.makeEvent}
                                className={"button is-info " + (this.state.sendingRequest && "is-loading")}
                            >
                                Create Event
                            </button>
                            <button
                                className="button is-warning"
                                onClick={() => this.props.history.push("/")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
);
