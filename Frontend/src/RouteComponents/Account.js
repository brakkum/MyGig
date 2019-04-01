import React from "react";
import Constants from "../Constants/Constants";
import MemberPicture from "../DisplayComponents/MemberPicture";
import "./Account.css";
import Input from "../HelperComponents/Input";
import Button from "../HelperComponents/Button";

export default class Account extends React.Component {
    // top level route component for /account

    _jwt = null;
    _isMounted = false;

    state = {
        fullName: "",
        photoUrl: null,
        showPasswordChange: false,
        showPhotoChange: false,
        oldPassword: "",
        oldPasswordConfirm: "",
        newPassword: "",
        passwordError: ""
    };

    componentDidMount() {
        this._isMounted = true;
        this._jwt = this.props.userData.jwt;

        this.setState({
            fullName: this.props.userData.fullName
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
                    {<MemberPicture url={this.props.userData.photoUrl} />}
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
                                })}
                            }
                            className={`box ${this.state.showPasswordChange ? "open" : "close"}`}
                        >
                            Change Password
                        </h2>
                    </div>
                    <div style={{
                        height: this.state.showPasswordChange ? "200px" : "0px",
                        opacity: this.state.showPasswordChange ? "1" : "0",
                        transition: "all 1s"
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
                        transition: "all 1s"
                    }}>
                        photo
                    </div>
                </div>
            </div>
        )
    }
}
