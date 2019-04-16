import React from "react";
import { Route, withRouter } from "react-router-dom";
import ProtectedRoute from "../SecurityComponents/ProtectedRoute";
import Home from "./Home";
import Account from "./Account";
import Notifications from "./Notifications";
import Connections from "./Connections";
import Event from "./Event";
import Ensemble from "./Ensemble";
import Sets from "./Sets";
import Login from "./Login";
import Logout from "./Logout";
import SearchPage from "./SearchPage";
import NewEvent from "./NewEvent";
import NewEnsemble from "./NewEnsemble";
import EditSetlist from "./EditSetlist";

export default withRouter(
    class MyGigRouter extends React.Component {
        // All routing logic for pages in MyGig
        // props:
        // userData: userData object passed to each page to populate data
        // loginUser: method of MyGig used to set userData in MyGig state
        // TODO: add logout route

        render() {
            return(
                <div className="mygig-routing">
                    <ProtectedRoute
                        exact
                        path="/"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Home
                        }
                    />
                    <ProtectedRoute
                        path="/account"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        updateUserPhoto={this.props.updateUserPhoto}
                        component={
                            Account
                        }
                    />
                    <ProtectedRoute
                        path="/notifications"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Notifications
                        }
                    />
                    <ProtectedRoute
                        path="/connections"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Connections
                        }
                    />
                    <ProtectedRoute
                        path="/event/:eventId"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Event
                        }
                    />
                    <ProtectedRoute
                        path="/ensemble/:ensembleId"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Ensemble
                        }
                    />
                    <ProtectedRoute
                        path="/sets/:eventId"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            Sets
                        }
                    />
                    <ProtectedRoute
                        path="/search"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            SearchPage
                        }
                    />
                    <ProtectedRoute
                        path="/newEvent"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            NewEvent
                        }
                    />
                    <ProtectedRoute
                        path="/newEnsemble"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            NewEnsemble
                        }
                    />
                    <ProtectedRoute
                        path="/editSetlist/:bookingId"
                        userData={this.props.userData}
                        loggedIn={this.props.loggedIn}
                        redirect={this.props.redirect}
                        pageLoaded={this.props.pageLoaded}
                        component={
                            EditSetlist
                        }
                    />
                    {
                        // reference param as this.props.match.params.eventId in component
                        // remaining components are accessible by anyone
                    }
                    <Route
                        path="/login"
                        render={() =>
                            <Login
                                userData={this.props.userData}
                                loginUser={this.props.loginUser}
                                redirect={this.props.redirect}
                                pageLoaded={this.props.pageLoaded}
                                loggedIn={this.props.loggedIn}
                            />
                        }
                    />
                    <Route
                        path="/logout"
                        render={() =>
                            <Logout
                                logoutUser={this.props.logoutUser}
                                redirect={this.props.redirect}
                            />
                        }
                    />
                </div>
            )
        }
    }
)
