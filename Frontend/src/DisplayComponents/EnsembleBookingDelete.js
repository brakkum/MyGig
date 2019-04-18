import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

export default withRouter(
    class EnsembleBookingDelete extends React.Component {

        state = {
            showConfirm: false
        };

        toggleShowConfirm = () => {
            this.setState({
                showConfirm: !this.state.showConfirm
            })
        };

        removeMember = userId => {
            fetch("/api/events/removeBooking", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.jwt}`
                }),
                body: JSON.stringify({
                    BookingId: this.props.bookingId,
                    EventId: this.props.eventId
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log("ensemble removed");
                        this.props.filterOutEnsemble(this.props.ensembleId);
                    } else {
                        console.log("ensemble not removed ", json);
                    }
                }).catch(e => {
                console.log(e);
            })
        };

        render() {
            console.log(this.props);
            return(
                <div
                    className="notification"
                >
                    <div>
                        <div className="columns is-vcentered">
                            <div className="column is-size-4">
                                {this.props.name}
                            </div>
                            <div className="column">
                                {this.state.showConfirm ?
                                    <div>
                                        <button
                                            className="button is-danger"
                                            onClick={() => this.removeMember(this.props.bookingId)}
                                        >
                                            Confirm Booking Removal
                                        </button>
                                    </div>
                                    :
                                    <span>
                                        Confirmed booking on {
                                            moment(this.props.memberSince)
                                                .format("MMMM D, YYYY")
                                        }
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <a
                        className="delete"
                        onClick={() => this.toggleShowConfirm()}
                    />
                </div>
            )
        }
    }
);