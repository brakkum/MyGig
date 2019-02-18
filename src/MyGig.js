import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './MyGig.css';
import Home from "./RouteComponents/Home";
import Notifications from "./RouteComponents/Notifications";
import Account from "./RouteComponents/Account";
import PublicEvent from "./RouteComponents/PublicEvent";
import PrivateEvent from "./RouteComponents/PrivateEvent";
import Ensemble from "./RouteComponents/Ensemble";
import Connections from "./RouteComponents/Connections";
import Sets from "./RouteComponents/Sets";
import NavBar from "./DisplayComponents/NavBar";

class MyGig extends Component {
    constructor(props) {
        super(props);
        // store user info here and pass to "page" components
        this.state = {
            "userData": {
                "id": this.props.userData.id
            }
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <div className="body-content">
                        <Route
                            exact
                            path="/"
                            render={() =>
                                <Home
                                    userData={this.state.userData}
                                />
                            }
                        />
                        <Route
                            path="/account"
                            render={() =>
                                <Account
                                    userData={this.state.userData}
                                />
                            }
                        />
                        <Route
                            path="/notifications"
                            render={() =>
                                <Notifications
                                    userData={this.state.userData}
                                />
                            }
                        />
                        <Route
                            path="/connections"
                            render={() =>
                                <Connections
                                    userData={this.state.userData}
                                />
                            }
                        />
                        { /* reference param as this.props.match.params.eventId in component */ }
                        <Route
                            path="/public_event/:eventId"
                            render={(match) =>
                                <PublicEvent
                                    userData={this.state.userData}
                                    {...match}
                                />
                            }
                        />
                        <Route
                            path="/event/:eventId"
                            render={(match) =>
                                <PrivateEvent
                                    userData={this.state.userData}
                                    {...match}
                                />
                            }
                        />
                        <Route
                            path="/ensemble/:ensembleId"
                            render={(match) =>
                                <Ensemble
                                    userData={this.state.userData}
                                    {...match}
                                />
                            }
                        />
                        <Route
                            path="/sets/:eventId"
                            render={(match) =>
                                <Sets
                                    userData={this.state.userData}
                                    {...match}
                                />
                            }
                        />

                        <div className="test-nav" style={{backgroundColor: "lightgreen", display: "flex", justifyContent: "space-between"}}>
                            <Link to="/">Home</Link>
                            <Link to="/account">Account</Link>
                            <Link to="/notifications">Notifications</Link>
                            <Link to="/public_event/2">Public Event 2</Link>
                            <Link to="/event/3">Private Event 3</Link>
                            <Link to="/ensemble/4">Ensemble 4</Link>
                            <Link to="/connections">Connections</Link>
                            <Link to="/sets/24">Sets for Event 24</Link>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default MyGig;
