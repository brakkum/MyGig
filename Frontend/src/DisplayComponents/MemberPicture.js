import React from "react";

export default class MemberPicture extends React.Component {

    render() {
        return (
            <div style={{margin: "auto"}}>
                <img
                    className="image is-centered"
                    style={{
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                        margin: "auto"
                    }}
                    width={this.props.width || "250px"}
                    src={this.props.photoUrl || "/static/userphotos/default.png"}
                    alt={this.props.fullName}
                />
            </div>
        )
    }
}
