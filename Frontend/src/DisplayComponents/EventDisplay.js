import React from "react";
import Button from "../HelperComponents/Button";
import JsPDF from "jspdf";
import moment from "moment";

export default class EventDisplay extends React.Component {

    _bookingId = null;
    _jwt = null;

    outputPdf = data => {
        console.log(data);
        const ensName = data.ensembleName;
        const eventLoc = data.eventLocation;
        const eventName = data.eventName;
        const date = moment(data.dateAndTime).format("LL");
        const songs = data.setlist.split("\n");
        const title = `${date}-${ensName}.pdf`;

        let pdf = new JsPDF("p", "mm", "letter");

        pdf.setProperties({
            title: title
        });

        pdf.setFontSize(25);
        pdf.text(15, 20, ensName);
        pdf.setFontSize(20);
        pdf.text(15, 30, `${eventLoc} - ${eventName}`);
        pdf.text(15, 40, date);

        let songY = 60;
        pdf.setFontSize(30);

        songs.forEach(song => {
            pdf.text(20, songY, song);
            songY += 15;
        });

        pdf.save(title);
    };

    downloadSetlist = () => {
        fetch("/api/ensembles/downloadSetlist", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                BookingId: this._bookingId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.outputPdf(json.setlist);
                } else {
                    console.log("setlist fetch fail ", json);
                }
            })
            .catch(e => console.log("setlist fail ", e));
    };

    componentDidMount() {
        this._bookingId = this.props.bookingId;
        this._jwt = this.props.jwt;
    }

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
                            onClick={this.downloadSetlist}
                        />
                    }
                </div>
            </div>
        )
    }
}
