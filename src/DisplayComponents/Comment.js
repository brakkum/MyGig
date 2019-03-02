import React from "react";
import MemberPictureConnect from "./MemberPictureConnect";
import TimeSince from "../HelperComponents/TimeSince";

export default class Comment extends React.Component {

    commentStyle = {
        width: "90%",
        minHeight: "60px",
        overflow: "scroll",
        margin: "auto",
        border: "1px solid blue",
        backgroundColor: "coral",
        display: "grid",
        gridTemplateColumns: "60px auto",
        gridTemplateRows: "10px auto auto 20px",
        gridTemplateAreas: "'photo username' 'photo comment' 'photo comment' 'photo time'",
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
                        {
                            this.props.data.commentUser.name
                        }
                    </div>
                    <div style={{gridArea: "comment", margin: "5px"}}>
                        {this.props.data.commentText}
                    </div>
                    <div style={{gridArea: "time", textAlign: "right"}}>
                        <TimeSince time={this.props.data.commentTime} />
                    </div>
                </div>
            </div>
        )
    }
}
