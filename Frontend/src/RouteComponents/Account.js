import MemberPictureDisplay from "../DisplayComponents/MemberPictureDisplay";
import moment from "moment";
import React from "react";

export default class Account extends React.Component {

    _isMounted = false;

    state = {
        pageLoading: true,
        fullName: "",
        photoUrl: null,
        joinDate: null,
        numEnsembles: null,
        currentTag: "info",
        oldPassword: "",
        oldPasswordError: false,
        oldPasswordConfirm: "",
        oldPasswordConfirmError: false,
        newPassword: "",
        newPasswordError: false,
        passwordError: "",
        photoHide: true,
        file: "",
        fileError: "",
        sendingRequest: false,
        jwt: ""
    };

    componentDidMount() {
        this._isMounted = true;
        const jwt = this.props.jwt;
        const hash = window.location.hash;
        if (hash) {
            this.setState({currentTag: hash.replace("#", "")});
        }

        this.setState({
            jwt: jwt
        });

        fetch("/api/users/getuserinfo", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => res.json())
            .then(json => {
                if (this._isMounted && json.success) {
                    const user = json.user;
                    this.setState({
                        fullName: user.fullName,
                        photoUrl: user.photoUrl,
                        joinedOn: user.joinedOn,
                        numEnsembles: user.numEnsembles,
                        pageLoading: false
                    })
                } else {
                    this.props.history.push("/");
                }
            }).catch(e => console.log("user get error ", e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updatePassword = event => {
        event.preventDefault();

        let oldPass = this.state.oldPassword;
        let oldPassConf = this.state.oldPasswordConfirm;
        let newPass = this.state.newPassword;

        this.setState({
            passwordError: "",
            oldPasswordError: false,
            oldPasswordConfirmError: false,
            newPasswordError: false
        });

        if (!oldPass || !oldPassConf || !newPass) {
            this.setState({
                passwordError: "All fields required",
                oldPasswordError: !oldPass,
                oldPasswordConfirmError: !oldPassConf,
                newPasswordError: !newPass
            });
            return;
        }

        if (oldPass !== oldPassConf) {
            this.setState({
                passwordError: "Passwords don't match",
                oldPasswordError: true,
                oldPasswordConfirmError: true,
            });
            return;
        }

        if (newPass.length < 6) {
            this.setState({
                passwordError: "Password must be at least 6 characters",
                newPasswordError: true
            });
            return;
        }

        this.setState({
            sendingRequest: true
        });

        fetch("/api/users/newPassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.jwt}`
            },
            body: JSON.stringify({
                OldPassword: oldPass,
                OldPasswordConfirm: oldPassConf,
                NewPassword: newPass
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        currentTag: "info",
                        oldPassword: "",
                        oldPasswordConfirm: "",
                        newPassword: "",
                        sendingRequest: false
                    });
                    alert("Password updated");
                } else {
                    this.setState({
                        passwordError: json.error,
                        sendingRequest: false
                    });
                }
            }).catch(e => console.log(e))
    };

    updatePhoto = event => {
        event.preventDefault();
        let file = this.state.file;

        if (!file) {
            this.setState({
                fileError: "File required"
            });
            return;
        }

        if (file.size > 5242880) {
            this.setState({
                fileError: "Please use file below 5MB"
            });
            return;
        }

        let form = new FormData();
        form.append("file", file);

        let options = {
            method: "post",
            headers: {
                "Authorization": `Bearer ${this.state.jwt}`
            },
            body: form
        };
        delete options.headers['Content-Type'];

        this.setState({
            sendingRequest: true
        });

        fetch("/api/users/newUserPhoto",
            options
        ).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        currentTag: "info",
                        fileError: "",
                        file: "",
                        photoUrl: json.url,
                        sendingRequest: false
                    });
                } else {
                    this.setState({
                        fileError: json.error,
                        sendingRequest: false
                    });
                }
        }).catch(e => console.log("photo fail ", e));
    };

    updateValue = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    updateFile = event => {
        this.setState({
            file: event.target.files[0]
        });
    };

    render() {
        return(
            <div className={"section"}>
                {
                    this.state.pageLoading ?
                        <progress className="progress" />
                        :
                        <div className="box">
                            <div className="tabs">
                                <ul>
                                    <li
                                        className={this.state.currentTag === "info" ? "is-active" : ""}
                                        onClick={() => this.setState({currentTag: "info"})}
                                    >
                                        <a href="#info">Info</a>
                                    </li>
                                    <li
                                        className={this.state.currentTag === "password" ? "is-active" : ""}
                                        onClick={() => this.setState({currentTag: "password"})}
                                    >
                                        <a href="#password">Change Password</a>
                                    </li>
                                    <li
                                        className={this.state.currentTag === "photo" ? "is-active" : ""}
                                        onClick={() => this.setState({currentTag: "photo"})}
                                    >
                                        <a href="#photo">Change Photo</a>
                                    </li>
                                </ul>
                            </div>
                            {
                                this.state.currentTag === "info" &&
                                    <div className="columns">
                                        <div className="column">
                                            <h1 className="is-size-1">
                                                {this.state.fullName}
                                            </h1>
                                            <h3 className="is-size-3">
                                                Joined on {moment(this.state.joinedOn).format("MMMM D, YYYY")}
                                            </h3>
                                            <h3 className="is-size-3">
                                                Member of {this.state.numEnsembles} ensemble
                                                {!(this.state.numEnsembles === 1) && "s"}
                                            </h3>
                                        </div>
                                        <div className="column is-flex">
                                            <MemberPictureDisplay {...this.state} />
                                        </div>
                                    </div>
                            }
                            {
                                this.state.currentTag === "password" &&
                                    <div>
                                        <div className="field">
                                            <label className="label">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                className={"input " + (this.state.oldPasswordError && "is-danger")}
                                                value={this.state.oldPassword}
                                                onChange={e => this.updateValue("oldPassword", e)}
                                            />
                                        </div>
                                        <div className="field">
                                            <label className="label">
                                                Confirm Current Password
                                            </label>
                                            <input
                                                type="password"
                                                className={"input " + (this.state.oldPasswordConfirmError && "is-danger")}
                                                value={this.state.oldPasswordConfirm}
                                                onChange={e => this.updateValue("oldPasswordConfirm", e)}
                                            />
                                        </div>
                                        <div className="field">
                                            <label className="label">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className={"input " + (this.state.newPasswordError && "is-danger")}
                                                value={this.state.newPassword}
                                                onChange={e => this.updateValue("newPassword", e)}
                                            />
                                        </div>
                                        <div className="field">
                                            <div className="columns">
                                                <div className="column">
                                                    {this.state.passwordError}
                                                </div>
                                                <div className="column">
                                                    <div className="buttons is-right">
                                                        <button
                                                            className={"button is-info " + (this.state.sendingRequest && "is-loading")}
                                                            onClick={e => this.updatePassword(e)}
                                                        >
                                                            Update Password
                                                        </button>
                                                        <button
                                                            className={"button " + (this.state.sendingRequest && "is-loading")}
                                                            onClick={() => this.setState({
                                                                oldPassword: "",
                                                                oldPasswordConfirm: "",
                                                                newPassword: "",
                                                                currentTag: "info"
                                                            })}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                this.state.currentTag === "photo" &&
                                    <div>
                                        <div className="field">
                                            <div className="file is-centered has-name is-boxed">
                                                <label className="file-label">
                                                    <input className="file-input" type="file"
                                                        onChange={e => this.updateFile(e)}
                                                    />
                                                        <span className="file-cta">
                                                            <span className="file-label">
                                                                Choose a photo…
                                                            </span>
                                                        </span>
                                                        <span className="file-name">
                                                            {this.state.file.name}
                                                        </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="columns">
                                                <div className="column">
                                                    {this.state.fileError}
                                                </div>
                                                <div className="column">
                                                    <div className="buttons is-right">
                                                        <button
                                                            className={"button is-info " + (this.state.sendingRequest && "is-loading")}
                                                            onClick={e => this.updatePhoto(e)}
                                                        >
                                                            Update Photo
                                                        </button>
                                                        <button
                                                            className={"button " + (this.state.sendingRequest && "is-loading")}
                                                            onClick={() => this.setState({
                                                                file: "",
                                                                fileError: "",
                                                                currentTag: "info"
                                                            })}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    }
            </div>
        )
    }
}
