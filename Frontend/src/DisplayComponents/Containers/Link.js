import React from "react";
import { withRouter } from "react-router";
import Constants from "../../Constants/Constants";

export default withRouter(class Link extends React.Component {

    onClick = () =>{
        this.props.redirect(this.props.url, this.props.location.pathname);
    };

    render() {
        return(
            <div onClick={this.onClick} style={{
                color: this.props.color || Constants.linkColor,
                cursor: "pointer"
            }}>
                {
                    this.props.text
                }
            </div>
        )
    }
});
