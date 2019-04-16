import React from "react";
import JsPDF from "jspdf";
import moment from "moment";
import { Link } from "react-router-dom";

export default class UpcomingPerformancesTable extends React.Component {

    _jwt = null;

    outputPdf = data => {

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
        let pageHeight = pdf.internal.pageSize.height;
        pdf.setFontSize(30);

        songs.forEach(song => {
            pdf.text(20, songY, song);
            songY += 15;
            if (songY > pageHeight - 20) {
                pdf.addPage();
                songY = 30;
            }
        });

        pdf.save(title);
    };

    downloadSetlist = bookingId => {
        fetch("/api/ensembles/downloadSetlist", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                BookingId: bookingId
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
        this._jwt = this.props.jwt;
    }

    render() {
        return(
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Date and Time</th>
                        <th>Ensemble</th>
                        <th>Location</th>
                        <th></th>
                        <th>Setlist</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.performances && this.props.performances.map((perf, i) => {
                        const userIsMod = perf.userIsMod;
                        return <tr key={i}>
                            <td>{moment(perf.dateAndTime).format("MMM D, h:mm A")}</td>
                            <td><Link to={`/ensemble/${perf.ensembleId}`}>{perf.ensembleName}</Link></td>
                            <td>{perf.eventLocation}</td>
                            <td>{userIsMod && <Link to={"/editSetlist/" + perf.bookingId} >Edit Set</Link>}</td>
                            <td>{perf.setlist ? <a className="" onClick={() => this.downloadSetlist(perf.bookingId)}>Download Setlist</a> : "No Setlist"}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        )
    }
}
