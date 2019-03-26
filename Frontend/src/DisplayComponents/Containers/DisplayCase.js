import React from "react";
import Constants from "../../Constants/Constants";

export default class DisplayCase extends React.Component {
    // used to contain things such as comments, notifications
    // four are featured on home page for user
    // props:
    // label: words to appear above box
    // children: elements inside display
    // maxHeight: int, max height of container
    // containerStyle: style to add to container
    // boxStyle: style to add to box
    // backgroundColor

    containerStyle = {
        width: "90%",
        maxWidth: "600px",
        margin: "auto"
    };

    boxStyle = {
        backgroundColor: this.props.backgroundColor || Constants.displayCaseColor,
        borderRadius: "4px",
        maxHeight: this.props.maxHeight ? this.props.maxHeight + "px" : "280px",
        overflow: "scroll",
    };

    render() {
        return(
            <div className={"DisplayCase"}>
                <div style={{...this.containerStyle, ...this.props.containerStyle}}>
                    <div>
                        <div style={{
                            fontSize: "28px",
                            margin: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline"
                        }}>
                            <span>
                                {
                                    this.props.labelLeft
                                }
                            </span>
                            <span style={{fontSize: "16px"}} >
                                {
                                    this.props.labelRight
                                }
                            </span>
                        </div>
                    </div>
                    <div style={{...this.boxStyle, ...this.props.boxStyle}}>
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </div>
        )
    }
}
