import { withRouter } from "react-router-dom";
import moment from "moment";
import React from "react";

export default withRouter(
    class EnsembleBookingDeleteDisplay extends React.Component {

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
                        this.props.filterOutEnsemble(this.props.ensembleId);
                    }
                }).catch(e => {console.log(e);})
        };

        render() {
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