import React from "react";
import MemberPictureConnect from "./MemberPictureConnect";
import TimeSince from "../HelperComponents/TimeSince";
import Constants from "../Constants/Constants";

export default class Comment extends React.Component {

    commentStyle = {
        width: "90%",
        minHeight: "60px",
        overflow: "scroll",
        margin: "auto",
        backgroundColor: Constants.commentColor,
        display: "grid",
        borderRadius: "4px",
        gridTemplateColumns: "70px auto",
        gridTemplateRows: "20px auto auto 30px",
        gridTemplateAreas: "'photo username' 'photo comment' 'photo comment' 'photo time'"
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
                    <div style={{gridArea: "username", fontWeight: "bolder"}}>
                        {
                            this.props.data.commentUser.name
                        }
                    </div>
                    <div style={{gridArea: "comment", margin: "5px 15px 5px 10px"}}>
                        {this.props.data.commentText}
                    </div>
                    <div style={{gridArea: "time", textAlign: "right", fontWeight: "bold"}}>
                        <TimeSince time={this.props.data.commentTime} />
                    </div>
                </div>
            </div>
        )
    }
}
