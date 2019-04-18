import React from "react";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";
import { withRouter } from "react-router-dom";

export default withRouter(
    class EditSetlist extends React.Component {

        _isMounted = false;
        _jwt = null;
        _bookingId = null;
        _ensembleId = null;

        state = {
            setlist: "",
            sendingRequest: false,
            setlistLoading: true
        };

        updateSetlist = () => {
            const setlist = this.state.setlist;

            fetch("/api/ensembles/updatesetlist", {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this._jwt}`
                }),
                body: JSON.stringify({
                    BookingId: this._bookingId,
                    Setlist: setlist
                })
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.props.redirect(`/ensemble/${this._ensembleId}`, `/editsetlist/${this._bookingId}`)
                    }
                })
                .catch(e => console.log("setlist update fail ", e));
        };

        componentDidMount() {
            this._isMounted = true;
            this._jwt = this.props.userData.jwt;
            this._bookingId = this.props.match.params.bookingId;

            // fetch
            fetch("/api/ensembles/getSetlist",{
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
                    if (json.success && this._isMounted) {
                        this.setState({
                            setlist: json.setlist,
                            setlistLoading: false
                        });
                        this._ensembleId = json.ensembleId;
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
                    {!this.state.setlistLoading ?
                        <div>
                            <span>One song per line</span>
                            <Input
                                type={"textarea"}
                                value={this.state.setlist}
                                onChange={this.onChange}
                                height={"400px"}
                                sendingRequest={this.state.sendingRequest}
                                resizeable={true}
                            />
                            <Button
                                type={"submit"}
                                color={"success"}
                                preClickText={"Update Setlist"}
                                onClick={this.updateSetlist}
                            />
                            <Button
                                type={"submit"}
                                color={"danger"}
                                preClickText={"Cancel"}
                                onClick={() => this.props.history.push(`/ensemble/${this._ensembleId}`)}
                            />
                        </div>
                        :
                        <progress className="progress"/>
                    }
                </div>
            )
        }
    }
);
