import React from "react";
import moment from "moment";
import Button from "../HelperComponents/Button";

export default class EventDisplay extends React.Component {

    render() {
        return(
            <div
                style={{
                    height: "80px",
                    display: "grid",
                    gridTemplateAreas: "'info datetime editset getset'",
                    gridTemplateColumns: "30% 10% 40% 20%",
                    gridTemplateRows: "auto"
                }}
            >
                <div
                    style={{gridArea: "info"}}
                >
                    <div>{this.props.ensembleName}</div>
                    <div>{this.props.name || this.props.eventName}</div>
                    <div>{this.props.location || this.props.eventLocation}</div>
                </div>
                <div
                    style={{gridArea: "datetime"}}
                >
                    {
                        moment(this.props.dateAndTime)
                            .format("MMM Do h:mm A")
                    }
                </div>
                <div
                    style={{
                        gridArea: "editset"
                    }}
                >
                    {this.props.userIsMod &&
                        <Button
                            preClickText={"Edit Setlist"}
                            color={"success"}
                            onClick={
                                () => this.props.redirect(`/editsetlist/${this.props.bookingId}`)
                            }
                        />
                    }
                </div>
                <div
                    style={{
                        gridArea: "getset"
                    }}
                >
                    {this.props.setlist &&
                        <Button
                            preClickText={"Download Setlist"}
                            color={"success"}
                        />
                    }
                </div>
            </div>
        )
    }
}
