import React from "react";
import { Route, withRouter } from "react-router-dom";
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

export default withRouter(
    class MyGigRouter extends React.Component {
        // All routing logic for pages in MyGig
        // props:
        // userData: userData object passed to each page to populate data
        // loginUser: method of MyGig used to set userData in MyGig state
        // TODO: add logout route

        render() {
            return(
                <div className="routing">
                    <ProtectedRoute
                        exact
                        path="/"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Home
                        }
                    />
                    <ProtectedRoute
                        path="/account"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Account
                        }
                    />
                    <ProtectedRoute
                        path="/notifications"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Notifications
                        }
                    />
                    <ProtectedRoute
                        path="/connections"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Connections
                        }
                    />
                    <ProtectedRoute
                        path="/event/:eventId"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            PrivateEvent
                        }
                    />
                    <ProtectedRoute
                        path="/ensemble/:ensembleId"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Ensemble
                        }
                    />
                    <ProtectedRoute
                        path="/sets/:eventId"
                        userData={this.props.userData}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
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
                        render={(match) =>
                            <PublicEvent
                                userData={this.props.userData}
                                redirect={this.props.redirect}
                                pageLoaded={this.props.pageLoaded}
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
                                redirect={this.props.redirect}
                                pageLoaded={this.props.pageLoaded}
                            />
                        }
                    />
                    <div className="test-nav" style={{backgroundColor: "lightgreen", display: "flex", justifyContent: "space-between"}}>
                        <div onClick={() => this.props.redirect("/", this.props.location.pathname)}>Home</div>
                        <div onClick={() => this.props.redirect("/account", this.props.location.pathname)}>Account</div>
                        <div onClick={() => this.props.redirect("/notifications", this.props.location.pathname)}>Notif</div>
                        <div onClick={() => this.props.redirect("/public_event/2", this.props.location.pathname)}>pubEve2</div>
                        <div onClick={() => this.props.redirect("/event/3", this.props.location.pathname)}>priEv3</div>
                        <div onClick={() => this.props.redirect("/ensemble/4", this.props.location.pathname)}>ense4</div>
                        <div onClick={() => this.props.redirect("/connections", this.props.location.pathname)}>conn</div>
                        <div onClick={() => this.props.redirect("/sets/24", this.props.location.pathname)}>sets24</div>
                    </div>
                </div>
            )
        }
    }
)