import React from "react";
import MemberPictureConnect from "./MemberPictureConnect";
import MemberNameDisplay from "./MemberNameDisplay";

export default class Comment extends React.Component {

    commentStyle = {
        width: "90%",
        minHeight: "60px",
        maxHeight: "250px",
        overflow: "scroll",
        margin: "auto",
        border: "1px solid blue",
        backgroundColor: "coral",
        display: "grid",
        gridTemplateColumns: "60px auto",
        gridTemplateRows: "10px auto auto",
        gridTemplateAreas: "'photo username' 'photo comment' 'photo comment'",
        gridGap: "10px"
    };

    render() {
        return(
            <div style={{padding: "4px"}}>
                <div style={this.commentStyle}>
                    <div style={{gridArea: "photo", alignSelf: "center", justifySelf: "center"}}>
                        <MemberPictureConnect
                            memberData={this.props.data.commentUser}
                        />
                    </div>
                    <div style={{gridArea: "username"}}>
                        <MemberNameDisplay memberData={this.props.data.commentUser} />
                    </div>
                    <div style={{gridArea: "comment"}}>
                        {this.props.data.commentText}
                    </div>
                </div>
            </div>
        )
    }
}
