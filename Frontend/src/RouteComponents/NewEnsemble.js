import React from "react";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class NewEvent extends React.Component {

    state = {
        name: "",
        nameValid: true,
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

        if (valid) {
            this.setState({sendingRequest: true});
            let jwt = this.props.userData.jwt;

            fetch("/api/ensembles/newensemble", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }),
                body: JSON.stringify({
                    Name: this.state.name
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({sendingRequest: false});
                        this.props.redirect(`/ensemble/${json.ensembleId}`);
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
                    for={"Ensemble Name"}
                    value={this.state.name}
                    valid={this.state.nameValid}
                    name={"name"}
                    onChange={name => this.updateValue("name", name)}
                />
                <Button
                    onClick={this.makeEvent}
                    type={"submit"}
                    preClickText={"Create Ensemble"}
                    style={{float: "right"}}
                    colorType={"success"}
                    buttonType={"submit"}
                    sendingRequest={this.state.sendingRequest}
                />
            </div>
        )
    }
}
