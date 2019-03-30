import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";
import DateDisplay from "../HelperComponents/DateDisplay";
import Constants from "../Constants/Constants";

export default class Header extends React.Component {
    // Reusable header
    // used for public/private event page headers
    // and ensemble pages

    state = {
        showMemberAdd: false,
        showEnsembleAdd: false,
        results: []
    };

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

    render() {
        let opacity = this.state.showMemberAdd ? "1" : "0";
        let height = this.state.showMemberAdd ? "300px" : "0px" ;
        console.log(this.props);
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
                        <EnsemblesList
                            userIsMod={this.props.userIsMod}
                            ensembles={this.props.ensembles}
                        />
                        // add ensemble search
                }
                {
                    // for ensemble pages
                    this.props.members &&
                        <div>
                            <EnsembleMembersList
                                userIsMod={this.props.userIsMod}
                                ensembleMembers={this.props.members}
                            />
                            <span
                                onClick={this.toggleAddMembers}
                                style={{color: Constants.linkColor}}
                            >
                                Add Members
                            </span>
                            <div
                                style={{
                                    opacity: opacity,
                                    transition: "all 1s",
                                    height: height
                                }}
                            >
                                hello
                            </div>
                        </div>
                }
            </div>
        )
    }
}
