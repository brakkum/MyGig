import { withRouter } from "react-router-dom";
import React from "react";
import Progress from "../DisplayComponents/Progress";

export default withRouter(
    class EditSetlist extends React.Component {

        _isMounted = false;

        state = {
            sendingRequest: false,
            setlistLoading: true,
            ensembleId: null,
            bookingId: null,
            eventId: null,
            setlist: ""
        };

        updateSetlist = () => {
            fetch("/api/ensembles/updateSetlist", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.state.jwt}`
                }),
                body: JSON.stringify({
                    BookingId: this.state.bookingId,
                    Setlist: this.state.setlist
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.history.push(`/ensemble/${this.state.ensembleId}`);
                    }
                })
                .catch(e => console.log("setlist update fail ", e));
        };

        componentDidMount() {
            this._isMounted = true;
            const jwt = this.props.jwt;
            const bookingId = parseInt(this.props.match.params.bookingId);

            this.setState({
                jwt: jwt,
                bookingId: bookingId
            });

            // fetch
            fetch("/api/ensembles/getSetlist",{
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                }),
                body: JSON.stringify({
                    BookingId: bookingId
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success && this._isMounted) {
                        this.setState({
                            bookingId: json.bookingId,
                            setlistLoading: false,
                            setlist: json.setlist || "",
                            eventId: json.eventId,
                            ensembleId: json.ensembleId
                        });
                    } else {
                        this.props.history.push("/");
                    }
                }).catch(e => console.log(e));
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        onChange = text => {
            this.setState({
                setlist: text
            })
        };

        render() {
            return(
                <div className="section">
                    {this.state.setlistLoading ?
                        <Progress />
                        :
                        <div>
                            <span>One song per line</span>
                            <div className="field">
                                <textarea
                                    style={{resize: "vertical"}}
                                    value={this.state.setlist}
                                    onChange={e => this.onChange(e.target.value)}
                                    className="textarea"
                                    placeholder="setlist"
                                    rows="15"
                                />
                            </div>
                            <div className="field">
                                <div className="buttons is-pulled-right">
                                    <button
                                        className="button is-success"
                                        onClick={this.updateSetlist}
                                    >
                                        Update Setlist
                                    </button>
                                    <button
                                        className="button"
                                        onClick={() => this.props.history.push(`/ensemble/${this.state.ensembleId}`)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }
);
