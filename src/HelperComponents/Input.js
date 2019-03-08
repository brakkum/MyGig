import React from "react";

export default class Input extends React.Component {
    // input for forms
    // props:
    // for: title above input
    // type: input type
    // value: current value of input
    // name: name to be supplied to input
    // onChange: function from parent for on change state handling

    state = {
        value: "",
        error: "an error",
    };

    onChange = event => {
        this.setState({
           value: event.target.value
        });
        this.props.onChange(event.target.value);
    };

    render() {
        return(
            <div style={{width: "90%", margin: "auto"}}>
                <div style={{margin: "10px", fontSize: "15px"}}>
                    {this.props.for}
                    <span style={{color: "darkred", float: "right"}}>
                        {this.state.error}
                    </span>
                </div>
                <input
                    type={this.props.type || "text"}
                    value={this.state.value}
                    name={this.props.name}
                    onChange={event => this.onChange(event)}
                    style={{
                        width: "100%",
                        borderRadius: "4px",
                        height: "20px",
                        fontSize: "18px"
                    }}
                />
            </div>
        )
    }
}
