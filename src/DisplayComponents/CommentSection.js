import React from "react";
import DisplayCase from "./DisplayCase";
import Comment from "./Comment";

export default class CommentSection extends React.Component {
    // show comments for events, ensembles
    // props
    // comments: array of comments

    render() {
        return(
            <DisplayCase label={this.props.label || "Comments"}>
                {
                    this.props.comments.map((comment, i) => {
                       return <Comment data={comment} key={i} />
                    })
                }
            </DisplayCase>
        )
    }
}
