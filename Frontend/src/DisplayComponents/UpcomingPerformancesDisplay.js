import React from "react";
import JsPDF from "jspdf";
import moment from "moment";
import { Link } from "react-router-dom";

export default class UpcomingPerformancesDisplay extends React.Component {

    _jwt = null;

    state = {
        hidePerformances: true
    };

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
        const performances = this.props.performances;
        return(
            <div>
                {
                    performances.map((perf, i) => {
                        const userIsMod = perf.userIsMod;
                        return <div key={i}>
                            <div className={"columns" + (this.state.hidePerformances && i >= 3 ? " is-hidden" : "")}>
                                <div className="column">
                                    <h4 className="is-size-5">
                                        {moment(perf.dateAndTime).format("MMM D, h:mm A")}
                                    </h4>
                                    <h5 className="is-size-5">
                                        <Link to={`/ensemble/${perf.ensembleId}`}>
                                            {perf.ensembleName}
                                        </Link>
                                    </h5>
                                    <h5 className="is-size-5">
                                        {perf.eventLocation}
                                    </h5>
                                    <h5 className="is-size-5 is-hidden-tablet">
                                        {perf.setlist ?
                                            <a
                                                className=""
                                                href={`#getsetlist-${perf.bookingId}`}
                                                onClick={() => this.downloadSetlist(perf.bookingId)}
                                            >
                                                Download Setlist
                                            </a> : "No Setlist"
                                        }
                                    </h5>
                                    <h5 className="is-size-5 is-hidden-tablet">
                                        {userIsMod &&
                                        <Link
                                            to={"/editSetlist/" + perf.bookingId}
                                            className="has-text-danger"
                                        >
                                            Edit Setlist
                                        </Link>
                                        }
                                    </h5>
                                </div>
                                <div className="column is-hidden-mobile">
                                    <h5 className="is-size-5 has-text-right">
                                        {perf.setlist ?
                                            <a
                                                className=""
                                                href={`#getsetlist-${perf.bookingId}`}
                                                onClick={() => this.downloadSetlist(perf.bookingId)}
                                            >
                                                Download Setlist
                                            </a> : "No Setlist"
                                        }
                                    </h5>
                                    <h5 className="is-size-5 has-text-right">
                                        {userIsMod &&
                                            <Link
                                                to={"/editSetlist/" + perf.bookingId}
                                                className="has-text-danger"
                                            >
                                                Edit Setlist
                                            </Link>
                                        }
                                    </h5>
                                </div>
                            </div>
                            {i !== performances.length - 1 &&
                                <hr style={{margin: "0 0 20px 0"}} />
                            }
                        </div>
                    })
                }
                {
                    this.props.performances.length >= 3 &&
                        <div className="has-text-centered">
                            <a href="#performances" onClick={() => this.setState({hidePerformances: !this.state.hidePerformances})}>
                                {this.state.hidePerformances ? "More" : "Less"}
                            </a>
                        </div>
                }
            </div>
        )
    }
}
