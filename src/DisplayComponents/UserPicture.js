import React from "react";

export default class UserPicture extends React.Component {
    state = {
        pic_url: null,
        user_name: null
    };

    baseStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        backgroundColor: "lightblue",
    };

    hasPic = {
        backgroundImage: this.state.pic_url,
    };

    render() {
        let includePic = this.state.pic_url ? this.hasPic : {};
        return(
            <div
                className="user-pic"
                style={{...includePic, ...this.baseStyle}}
                onClick={this.props.onClick}
            >

            </div>
        )
    }
}
