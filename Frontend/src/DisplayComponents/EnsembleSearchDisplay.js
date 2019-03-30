import React from "react";
import Button from "../HelperComponents/Button";

export default class EnsembleSearchDisplay extends React.Component {

    state = {
        ensembleId: null,
        name: null,
        sendingRequest: false,
    };

    componentDidMount() {
        this.setState({
            ensembleId: this.props.ensemble.ensembleId,
            name: this.props.ensemble.name
        })
    }

    onClick = async () => {
        this.setState({
            sendingRequest: true
        });
        this.props.buttonFunc(this.state.ensembleId)
            .then(success => {
                if (success) {
                    this.props.filterEnsemble(this.state.ensembleId);
                }
            });

        this.setState({
            sendingRequest: false
        });
    };

    render() {
        return(
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "10px",

            }}>
                <Button
                    sendingRequest={this.state.sendingRequest}
                    preClickText={this.props.buttonText}
                    postClickText={"Sending.."}
                    onClick={this.onClick}
                />
                {this.state.name}
            </div>
        )
    }
}
