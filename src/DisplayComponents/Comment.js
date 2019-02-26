import React from "react";
import UserPicture from "./UserPicture";

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

    connectWithUser = () => {
        console.log("connectMethod ", this.props.data.commentUser.id);
    };

    render() {
        let notConnectedToUser = !(this.props.data.commentUser.connectedToUser);
        return(
            <div style={{padding: "4px"}}>
                <div style={this.commentStyle}>
                    <div style={{gridArea: "photo", alignSelf: "center", justifySelf: "center"}}>
                        <UserPicture
                            photoUrl={this.props.data.commentUser.photoUrl}
                            innerHtml={notConnectedToUser && "Add"}
                            highlightOnHover={notConnectedToUser}
                            onClick={notConnectedToUser ?
                                () => this.connectWithUser() : null}
                        />
                    </div>
                    <div style={{gridArea: "username"}}>
                        {this.props.data.commentUser.name}
                    </div>
                    <div style={{gridArea: "comment"}}>
                        {this.props.data.commentText}
                    </div>
                </div>
            </div>
        )
    }
}
