import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";
import DateDisplay from "../HelperComponents/DateDisplay";

export default class Header extends React.Component {
    // Reusable header
    // used for public/private event page headers
    // and ensemble pages

    render() {
        return (
            <div className="page-header">
                <h1>{this.props.name}</h1>
                <div className="details">
                    <h3>{this.props.location}</h3>
                    <DateDisplay datetime={this.props.dateAndTime} />
                </div>
                {
                    // for event pages
                    this.props.ensembles &&
                        <EnsemblesList ensembles={this.props.ensembles}/>
                }
                {
                    // for ensemble pages
                    this.props.ensembleMembers &&
                        <EnsembleMembersList ensembleMembers={this.props.ensembleMembers}/>
                }
            </div>
        )
    }
}
