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
import Login from "./RouteComponents/Login";
import ProtectedRoute from "./SecurityComponents/ProtectedRoute";

class MyGig extends Component {

    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.state = {
            "userData": null
        };
    }

    // so logging in isn't necessary right now
    componentWillMount() {
        this.setState({
            "userData": {
                "id": 1,
                "isLoggedIn": true
            }
        })
    }

    // this is called from login page
    loginUser = id => {
        this.setState({
            "userData": {
                "id": id,
                "isLoggedIn": true
            }
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <div className="body-content">
                        <ProtectedRoute
                            exact
                            path="/"
                            userData={this.state.userData}
                            component={
                                Home
                            }
                        />
                        <ProtectedRoute
                            path="/account"
                            userData={this.state.userData}
                            component={
                                Account
                            }
                        />
                        <ProtectedRoute
                            path="/notifications"
                            userData={this.state.userData}
                            component={
                                Notifications
                            }
                        />
                        <ProtectedRoute
                            path="/connections"
                            userData={this.state.userData}
                            component={
                                Connections
                            }
                        />
                        <ProtectedRoute
                            path="/event/:eventId"
                            userData={this.state.userData}
                            component={
                                PrivateEvent
                            }
                        />
                        <ProtectedRoute
                            path="/ensemble/:ensembleId"
                            userData={this.state.userData}
                            component={
                                Ensemble
                            }
                        />
                        <ProtectedRoute
                            path="/sets/:eventId"
                            userData={this.state.userData}
                            component={
                                Sets
                            }
                        />
                        {
                            // reference param as this.props.match.params.eventId in component
                            // remaining components are accessible by anyone
                        }
                        <Route
                            path="/public_event/:eventId"
                            userData={this.state.userData}
                            render={(match) =>
                                <PublicEvent
                                    userData={this.state.userData}
                                    {...match}
                                />
                            }
                        />
                        <Route
                            path="/login"
                            render={() =>
                                <Login
                                    userData={this.state.userData}
                                    loginUser={this.loginUser}
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
