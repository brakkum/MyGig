import React from "react";
import Constants from "../Constants/Constants";
import MemberPicture from "../DisplayComponents/MemberPicture";
import "./Account.css";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";
import FileInput from "../HelperComponents/FileInput";

export default class Account extends React.Component {
    // top level route component for /account

    _jwt = null;
    _isMounted = false;

    state = {
        fullName: "",
        photoUrl: null,
        showPasswordChange: false,
        oldPassword: "",
        oldPasswordConfirm: "",
        newPassword: "",
        passwordError: "",
        showPhotoChange: false,
        photoHide: true,
        file: null,
        fileError: "",
    };

    componentDidMount() {
        this._isMounted = true;
        this._jwt = this.props.userData.jwt;

        this.setState({
            fullName: this.props.userData.fullName,
            photoUrl: this.props.userData.photoUrl
        });

        setTimeout(() => {
            this.props.pageLoaded();
        },1500)
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
            passwordError: ""
        });

        if (!oldPass || !oldPassConf || !newPass) {
            this.setState({
                passwordError: "All fields required"
            });
            return;
        }

        if (oldPass !== oldPassConf) {
            this.setState({
                passwordError: "Passwords don't match"
            });
            return;
        }

        fetch("/api/users/newpassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._jwt}`
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
                        showPasswordChange: false
                    });
                    alert("Password updated");
                } else {
                    this.setState({
                        passwordError: json.error
                    });
                }
            }).catch(e => console.log(e))
    };

    updatePhoto = event => {
        event.preventDefault();
        let file = this.state.file;
        console.log(file);

        if (!file) {
            this.setState({
                fileError: "File required"
            });
            return;
        }

        let form = new FormData();
        form.append("file", file);

        let options = {
            method: "post",
            headers: {
                "Authorization": `Bearer ${this._jwt}`
            },
            body: form
        };
        delete options.headers['Content-Type'];

        fetch("/api/users/newuserphoto",
            options
        ).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        fileError: "",
                        file: null,
                        photoUrl: json.url,
                        showPhotoChange: false
                    });
                    this.props.updateUserPhoto(json.url);
                } else {
                    this.setState({
                        fileError: json.error
                    });
                }
                console.log(json);
        }).catch(e => console.log("photo fail ", e));
    };

    updateValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return(
            <div className={"account-details"}
                style={{
                    margin: "50px"
                }}
            >
                <div
                    style={{
                        maxWidth: "50%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}
                >
                    <h1>{this.state.fullName}</h1>
                    {<MemberPicture photoUrl={this.state.photoUrl} />}
                </div>
                {/* password */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            color: Constants.linkColor
                        }}
                    >
                        <h2
                            onClick={() => {
                                this.setState({
                                    showPasswordChange: !this.state.showPasswordChange
                                });
                            }}
                            className={`box ${this.state.showPasswordChange ? "open" : "close"}`}
                        >
                            Change Password
                        </h2>
                    </div>
                    <div style={{
                        height: this.state.showPasswordChange ? "200px" : "0px",
                        opacity: this.state.showPasswordChange ? "1" : "0",
                        transition: "all 1s",
                        overflow: "hidden"
                    }}>
                        <span style={{margin: "10px", color: "darkred"}}>
                            {this.state.passwordError}
                        </span>
                        <form onSubmit={this.updatePassword}>
                            <Input
                                placeholder={"Current Password"}
                                type={"password"}
                                value={this.state.oldPassword}
                                onChange={pass => this.updateValue("oldPassword", pass)}
                            />
                            <Input
                                placeholder={"Confirm Current Password"}
                                type={"password"}
                                value={this.state.oldPasswordConfirm}
                                onChange={pass => this.updateValue("oldPasswordConfirm", pass)}
                            />
                            <Input
                                placeholder={"New Password"}
                                type={"password"}
                                value={this.state.newPassword}
                                onChange={pass => this.updateValue("newPassword", pass)}
                            />
                            <Button
                                style={{float: "right"}}
                                preClickText={"Update Password"}
                                type={"submit"}
                                onClick={this.updatePassword}
                            />
                        </form>
                    </div>
                </div>
            {/* photo */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            color: Constants.linkColor
                        }}
                    >
                        <h2
                            onClick={() => {
                                this.setState({
                                    showPhotoChange: !this.state.showPhotoChange
                                })}
                            }
                            className={`box ${this.state.showPhotoChange ? "open" : "close"}`}
                        >
                            Change Photo
                        </h2>
                    </div>
                    <div style={{
                        height: this.state.showPhotoChange ? "200px" : "0px",
                        opacity: this.state.showPhotoChange ? "1" : "0",
                        transition: "all 1s",
                        overflow: "hidden"
                    }}>
                        <span style={{margin: "10px", color: "darkred"}}>
                            {this.state.fileError}
                        </span>
                        <form onSubmit={this.updatePhoto}>
                            <FileInput
                                onChange={file => this.updateValue("file", file)}
                            />
                            <Button
                                type={"submit"}
                                onClick={this.updatePhoto}
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
