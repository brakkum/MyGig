import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";
import DateDisplay from "../HelperComponents/DateDisplay";
import Constants from "../Constants/Constants";
import UserSearch from "../FormComponents/UserSearch";
import EnsembleSearch from "../FormComponents/EnsembleSearch";
import DisplayCase from "./Containers/DisplayCase";
import UpcomingPerformancesTable from "./UpcomingPerformancesTable";

export default class Header extends React.Component {
    // Reusable header
    // used for public/private event page headers
    // and ensemble pages

    _jwt = null;
    _id = null;

    state = {
        showMemberAdd: false,
        showEnsembleAdd: false,
    };

    componentDidMount() {
        this._id = this.props.id;
        this._jwt = this.props.jwt;
    }

    toggleAddMembers = () => {
        this.setState({
            showMemberAdd: !this.state.showMemberAdd
        });
    };

    toggleAddEnsembles = () => {
        this.setState({
            showEnsembleAdd: !this.state.showEnsembleAdd
        });
    };

    requestUserToEnsemble = async userId => {
        let success = false;

        await fetch("/api/ensembles/newmember", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                UserIdRecipient: userId,
                EnsembleId: this._id
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested");
                    success = true;
                } else {
                    console.log("fail, ", json);
                    success = false
                }
            }).catch(e => console.log(e));

        return success;
    };

    requestEnsembleForEvent = async ensembleId => {
        let success = false;
        console.log(this._id, ensembleId)

        await fetch("/api/ensembles/requestbooking", {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._jwt}`
            }),
            body: JSON.stringify({
                EventId: this._id,
                EnsembleId: ensembleId
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success){
                    console.log("requested");
                    success = true;
                } else {
                    console.log("fail, ", json);
                    success = false
                }
            }).catch(e => console.log(e));

        return success;
    };

    render() {
        console.log(this.props);
        let memOpacity = this.state.showMemberAdd ? "1" : "0";
        let memHeight = this.state.showMemberAdd ? "300px" : "0px";
        let ensOpacity = this.state.showEnsembleAdd ? "1" : "0";
        let ensHeight = this.state.showEnsembleAdd ? "300px" : "0px";
        return (
            <div className="page-header">
                <h1>{this.props.name}</h1>
                <div className="details">
                    <h3>{this.props.location}</h3>
                        {
                            this.props.dateAndTime &&
                            <DateDisplay datetime={this.props.dateAndTime} />
                        }
                    </div>
                {
                    // for event pages
                    this.props.ensembles &&
                        <div>
                            <EnsemblesList
                                userIsMod={this.props.userIsMod}
                                ensembles={this.props.ensembles}
                            />
                            {
                                this._jwt && this.props.userIsMod &&
                                    <div>
                                        <span
                                            onClick={this.toggleAddEnsembles}
                                            style={{color: Constants.linkColor}}
                                        >
                                            Request Ensembles
                                        </span>
                                        <div
                                            style={{
                                                opacity: ensOpacity,
                                                transition: "all 1s",
                                                height: ensHeight
                                            }}
                                        >
                                            <EnsembleSearch
                                                jwt={this._jwt}
                                                url={"/api/ensembles/ensemblesnotonevent"}
                                                body={{Id: this._id}}
                                                buttonFunc={this.requestEnsembleForEvent}
                                                buttonText={"Send Request"}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>
                }
                {
                    // for ensemble pages
                    this.props.members &&
                        <div>
                            <DisplayCase
                                labelLeft={"Members"}
                            >
                                <EnsembleMembersList
                                    userIsMod={this.props.userIsMod}
                                    ensembleMembers={this.props.members}
                                    jwt={this._jwt}
                                />
                            </DisplayCase>
                            {
                                this._jwt && this.props.userIsMod &&
                                <div>
                                <span
                                    onClick={this.toggleAddMembers}
                                    style={{color: Constants.linkColor}}
                                >
                                    Add Members
                                </span>
                                    <div
                                        style={{
                                            opacity: memOpacity,
                                            transition: "all 1s",
                                            height: memHeight
                                        }}
                                    >
                                        {
                                            <UserSearch
                                                jwt={this._jwt}
                                                url={"/api/users/connsnotinensemble"}
                                                body={{Id: this._id}}
                                                buttonFunc={this.requestUserToEnsemble}
                                                buttonText={"Add to Ensemble"}
                                            />
                                        }
                                    </div>
                                </div>
                            }
                            {
                                this.props.events && this._jwt &&
                                    <DisplayCase
                                        labelLeft={"Upcoming Shows"}
                                        containerStyle={{gridColumnStart: "2"}}
                                    >
                                        {
                                            this.props.events.map((event, i) => {
                                                return <UpcomingPerformancesTable
                                                    {...event}
                                                    redirect={this.props.redirect}
                                                    userIsMod={this.props.userIsMod}
                                                    jwt={this._jwt}
                                                    key={i}
                                                />
                                            })
                                        }
                                    </DisplayCase>
                            }
                    </div>
                }
            </div>
        )
    }
}
