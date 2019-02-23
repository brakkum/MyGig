import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../SecurityComponents/ProtectedRoute";
import Home from "./Home";
import Account from "./Account";
import Notifications from "./Notifications";
import Connections from "./Connections";
import PrivateEvent from "./PrivateEvent";
import Ensemble from "./Ensemble";
import Sets from "./Sets";
import PublicEvent from "./PublicEvent";
import Login from "./Login";

export default class MyGigRouter extends React.Component {
    // All routing logic for pages in MyGig
    // props:
    // userData: userData object passed to each page to populate data
    // loginUser: method of MyGig used to set userData in MyGig state

    render() {
        return(
            <div className="routing">
                <ProtectedRoute
                    exact
                    path="/"
                    userData={this.props.userData}
                    component={
                        Home
                    }
                />
                <ProtectedRoute
                    path="/account"
                    userData={this.props.userData}
                    component={
                        Account
                    }
                />
                <ProtectedRoute
                    path="/notifications"
                    userData={this.props.userData}
                    component={
                        Notifications
                    }
                />
                <ProtectedRoute
                    path="/connections"
                    userData={this.props.userData}
                    component={
                        Connections
                    }
                />
                <ProtectedRoute
                    path="/event/:eventId"
                    userData={this.props.userData}
                    component={
                        PrivateEvent
                    }
                />
                <ProtectedRoute
                    path="/ensemble/:ensembleId"
                    userData={this.props.userData}
                    component={
                        Ensemble
                    }
                />
                <ProtectedRoute
                    path="/sets/:eventId"
                    userData={this.props.userData}
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
                    userData={this.props.userData}
                    render={(match) =>
                        <PublicEvent
                            userData={this.props.userData}
                            {...match}
                        />
                    }
                />
                <Route
                    path="/login"
                    render={() =>
                        <Login
                            userData={this.props.userData}
                            loginUser={this.props.loginUser}
                        />
                    }
                />
            </div>
        )
    }
}
