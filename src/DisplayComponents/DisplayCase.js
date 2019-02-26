import React from "react";

export default class DisplayCase extends React.Component {
    // used to contain things such as comments, notifications
    // four are featured on home page for user
    // props:
    // label: words to appear above box
    // children: elements inside display

    boxStyle = {
        backgroundColor: "darkgrey",
        borderRadius: "4px",
        maxHeight: "90%"
    };

    containerStyle = {
        width: "90%",
        maxWidth: "600px",
        height: "300px",
        margin: "auto"
    };

    render() {
        return(
            <div className={"DisplayCase"} style={{padding: "20px auto 20px auto"}}>
                <div style={this.containerStyle}>
                    <div style={{fontSize: "28px", margin: "5px"}}>
                        {
                            this.props.label || "displayBox!"
                        }
                    </div>
                    <div style={this.boxStyle}>
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </div>
        )
    }
}
