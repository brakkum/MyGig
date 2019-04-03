import React from "react";

export default class FileInput extends React.Component {
    // input for forms
    // props:
    // for: title above input
    // type: input type
    // value: current value of input
    // name: name to be supplied to input
    // onChange: function from parent for on change state handling
    // regex: regex input must match
    // error: message to display on regex fail
    // errorOverride error supplied from parent

    state = {
        value: "",
        error: "",
        valid: true,
    };

    onChange = event => {
        let file = event.target.files[0];
        this.setState({
            value: file
        });
        this.props.onChange(file);
    };

    render() {
        let validStyle = (this.props.valid || this.props.valid === undefined) ? {border: "1px solid lightgrey"} : {border: "1px solid #b73300"};
        return(
            <div style={{width: "90%", margin: "auto"}}>
                <div style={{margin: "10px", fontSize: "15px"}}>
                    {this.props.for}
                    <span style={{color: "darkred", float: "right"}}>
                        {this.props.errorOverride || this.state.error}
                    </span>
                </div>
                <input
                    type={"file"}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={event => this.onChange(event)}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    style={{
                        width: "100%",
                        borderRadius: "4px",
                        height: "25px",
                        padding: "5px",
                        fontSize: "18px",
                        ...validStyle
                    }}
                />
            </div>
        )
    }
}
