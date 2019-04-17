import React from "react";

export default class MemberPicture extends React.Component {

    render() {
        return (
            <img
                className="image is-centered"
                style={{
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    margin: "0 auto 10px auto"
                }}
                width="100px"
                src={this.props.photoUrl || "/static/userphotos/default.png"}
                alt={this.props.fullName}
            />
        )
    }
}
