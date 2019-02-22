import React from "react";
import EnsemblesList from "./EnsembleList";
import EnsembleMembersList from "./EnsembleMembersList";

export default class Header extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div className="page-header">
                <h1>
                    {
                        this.props.pageHeader
                    }
                </h1>
                {
                    this.props.details != null &&
                    <div className="details">
                        <h3>{this.props.details.location}</h3>
                        <h4>{this.props.details.time}</h4>
                    </div>
                }
                {
                    this.props.ensembles != null && <EnsemblesList ensembles={this.props.ensembles}/>
                }
                {
                    this.props.ensembleMembers != null && <EnsembleMembersList ensemble_members={this.props.ensembleMembers}/>
                }
            </div>
        )
    }
}
