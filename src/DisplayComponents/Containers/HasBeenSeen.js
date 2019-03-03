import React from "react";

export default class HasBeenSeen extends React.Component {
    // displays status based on circle on left side
    // props:
    // seen: boolean
    // accepted: boolean

    containerStyle = {
        width: "90%",
        margin: "5px auto",
        display: "grid",
        gridTemplateAreas: "'status children'",
        gridTemplateColumns: "50px auto",
        gridTemplateRows: "50px"
    };

    render() {
        let status = this.props.seen || this.props.accepted;
        return(
            <div style={this.containerStyle}>
                <div style={{gridArea: "status", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div style={{
                        width: "50%",
                        height: "50%",
                        borderRadius: "100px",
                        border: "2px solid grey",
                        backgroundColor: status ? "transparent" : "lightblue",
                    }}
                    onClick={this.props.circleClick ? this.props.circleClick : null}
                    />
                </div>
                <div style={{gridArea: "children", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}
