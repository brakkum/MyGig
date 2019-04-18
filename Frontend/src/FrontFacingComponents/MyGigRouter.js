import Connections from "../RouteComponents/Connections";
import NewEnsemble from "../RouteComponents/NewEnsemble";
import EditSetlist from "../RouteComponents/EditSetlist";
import SearchPage from "../RouteComponents/SearchPage";
import { Route, withRouter } from "react-router-dom";
import NewEvent from "../RouteComponents/NewEvent";
import Ensemble from "../RouteComponents/Ensemble";
import Account from "../RouteComponents/Account";
import Logout from "../RouteComponents/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Event from "../RouteComponents/Event";
import Login from "../RouteComponents/Login";
import Home from "../RouteComponents/Home";
import React from "react";

export default withRouter(
    class MyGigRouter extends React.Component {

        render() {
            return(
                <div className="mygig-routing">
                    <ProtectedRoute
                        exact
                        path="/"
                        user={this.props.user}
                        component={
                            Home
                        }
                    />
                    <ProtectedRoute
                        path="/account"
                        user={this.props.user}
                        component={
                            Account
                        }
                    />
                    <ProtectedRoute
                        path="/connections"
                        user={this.props.user}
                        component={
                            Connections
                        }
                    />
                    <ProtectedRoute
                        path="/event/:eventId"
                        user={this.props.user}
                        component={
                            Event
                        }
                    />
                    <ProtectedRoute
                        path="/ensemble/:ensembleId"
                        user={this.props.user}
                        component={
                            Ensemble
                        }
                    />
                    <ProtectedRoute
                        path="/search"
                        user={this.props.user}
                        component={
                            SearchPage
                        }
                    />
                    <ProtectedRoute
                        path="/newEvent"
                        user={this.props.user}
                        component={
                            NewEvent
                        }
                    />
                    <ProtectedRoute
                        path="/newEnsemble"
                        user={this.props.user}
                        component={
                            NewEnsemble
                        }
                    />
                    <ProtectedRoute
                        path="/editSetlist/:bookingId"
                        user={this.props.user}
                        component={
                            EditSetlist
                        }
                    />
                    <Route
                        path="/login"
                        render={() =>
                            <Login
                                user={this.props.user}
                                loginUser={this.props.loginUser}
                            />
                        }
                    />
                    <Route
                        path="/logout"
                        render={() =>
                            <Logout
                                logoutUser={this.props.logoutUser}
                            />
                        }
                    />
                </div>
            )
        }
    }
)
