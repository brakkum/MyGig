import React from "react";

export default class Comment extends React.Component {

    commentStyle = {
        width: "90%",
        minHeight: "50px",
        margin: "auto",
        border: "1px solid blue",
        backgroundColor: "red",
    };

    render() {
        return(
            <div style={{padding: "4px"}}>
                <div style={this.commentStyle}>
                    {this.props.data.commentText}
                </div>
            </div>
        )
    }
}
