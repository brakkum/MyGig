import React from "react";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class EditSetlist extends React.Component {

    _isMounted = false;
    _jwt = null;
    _bookingId = null;
    _ensembleId = null;

    state = {
        setlist: "",
        sendingRequest: false
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
                    console.log("setlist update success");
                    this.props.redirect(`/ensemble/${this._ensembleId}`, `/editsetlist/${this._bookingId}`)
                } else {
                    console.log("setlist update not successful ", json);
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
                if (json.success) {
                    this.setState({
                        setlist: json.setlist
                    });
                    this._ensembleId = json.ensembleId;
                    this.props.pageLoaded();
                } else {
                    console.log("setlist fetch fail ", json);
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
            <div>
                <span>One song per line</span>
                <Input
                    type={"textarea"}
                    value={this.state.setlist}
                    onChange={this.onChange}
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
                    onClick={() => this.props.redirect(`/ensemble/${this._ensembleId}`, `/editsetlist/${this._setlistId}`)}
                />
            </div>
        )
    }
}
