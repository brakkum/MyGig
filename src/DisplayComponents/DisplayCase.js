import React from "react";

export default class DisplayCase extends React.Component {
    // used to contain things such as comments, notifications
    // four are featured on home page for user
    // props:
    // label: words to appear above box
    // children: elements inside display

    containerStyle = {
        width: "90%",
        maxWidth: "600px",
        maxHeight: "300px",
        margin: "auto"
    };

    boxStyle = {
        backgroundColor: "darkgrey",
        borderRadius: "4px",
        maxHeight: "280px",
        overflow: "scroll"
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
