import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";

export default class Header extends React.Component {
    // Reusable header
    // used for public/private event page headers
    // and ensemble pages

    render() {
        return (
            <div className="page-header">
                <h1>
                    {
                        // pageHeader: top header title
                        this.props.pageHeader
                    }
                </h1>
                {
                    // details: for events, location & time
                    this.props.details &&
                    <div className="details">
                        <h3>{this.props.details.location}</h3>
                        <h4>{this.props.details.time}</h4>
                    </div>
                }
                {
                    // ensembles: array of ensembles involved in event
                    this.props.ensembles && <EnsemblesList ensembles={this.props.ensembles}/>
                }
                {
                    // ensembleMembers: members of the current ensemble page
                    this.props.ensembleMembers && <EnsembleMembersList ensembleMembers={this.props.ensembleMembers}/>
                }
            </div>
        )
    }
}
