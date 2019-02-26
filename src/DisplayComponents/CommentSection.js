import React from "react";
import DisplayCase from "./DisplayCase";
import Comment from "./Comment";

export default class CommentSection extends React.Component {

    render() {
        return(
            <DisplayCase>
                {
                    this.props.comments.map(comment => {
                       return <Comment data={comment} />
                    })
                }
            </DisplayCase>
        )
    }
}
