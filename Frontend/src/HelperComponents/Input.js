import React from "react";

export default class Input extends React.Component {
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
        let newVal = event.target.value;
        this.setState({
           value: newVal
        });
        if (this.props.regex) {
            if (!new RegExp(this.props.regex).test(newVal)) {
                this.setState({
                    error: this.props.error || "Invalid",
                    valid: false
                });
            } else {
                this.setState({
                    error: "",
                    valid: true
                });
            }
        }
        this.props.onChange(event.target.value);
    };

    render() {
        let Component = this.props.type === "textarea" ? "textarea" : "input";
        let validStyle = this.props.valid ? {border: "1px solid lightgrey"} : {border: "1px solid #b73300"};
        return(
            <div style={{width: "90%", margin: "auto"}}>
                <div style={{margin: "10px", fontSize: "15px"}}>
                    {this.props.for}
                    <span style={{color: "darkred", float: "right"}}>
                        {this.props.errorOverride || this.state.error}
                    </span>
                </div>
                <Component
                    type={this.props.type || "text"}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={event => this.onChange(event)}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    style={{
                        width: "100%",
                        borderRadius: "4px",
                        height: Component === "textarea" ? "50px" : "25px",
                        resize: Component === "textarea" && "none",
                        padding: "5px",
                        fontSize: "18px",
                        ...validStyle
                    }}
                />
            </div>
        )
    }
}
