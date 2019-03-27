import React from "react";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class NewEvent extends React.Component {

    state = {
        name: "",
        nameValid: true,
        location: "",
        locationValid: true,
        dateAndTime: "",
        dateAndTimeValid: true,
        sendingRequest: false,
        formError: null
    };

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    makeEvent = () => {
        let valid = true;
        if (!this.state.name) {
            this.setState({nameValid: false});
            valid = false;
        } else {
            this.setState({nameValid: true});
        }
        if (!this.state.location) {
            this.setState({locationValid: false});
            valid = false;
        } else {
            this.setState({locationValid: true});
        }
        if (!this.state.dateAndTime) {
            this.setState({dateAndTimeValid: false});
            valid = false;
        } else {
            this.setState({dateAndTimeValid: true});
        }

        if (valid) {
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
                        this.setState({sendingRequest: false});
                        this.props.redirect(`/event/${json.eventId}`);
                    } else {
                        this.setState({sendingRequest: false});
                    }
                })
            .catch(e => console.log(e));
        }
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.pageLoaded();
        }, 250);
    }

    render() {
        return(
            <div>
                <Input
                    for={"Name"}
                    value={this.state.name}
                    valid={this.state.nameValid}
                    name={"name"}
                    onChange={name => this.updateValue("name", name)}
                />
                <Input
                    for={"Location"}
                    value={this.state.location}
                    valid={this.state.locationValid}
                    name={"location"}
                    onChange={location => this.updateValue("location", location)}
                />
                <Input
                    for={"Date and Time"}
                    type={"datetime-local"}
                    value={this.state.dateAndTime}
                    valid={this.state.dateAndTimeValid}
                    name={"dateAndTime"}
                    onChange={dnt => this.updateValue("dateAndTime", dnt)}
                />
                <Button
                    onClick={this.makeEvent}
                    type={"submit"}
                    preClickText={"Create Event"}
                    style={{float: "right"}}
                    colorType={"success"}
                    buttonType={"submit"}
                    sendingRequest={this.state.sendingRequest}
                />
            </div>
        )
    }
}
