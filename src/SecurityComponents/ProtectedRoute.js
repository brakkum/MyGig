import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({component: Component, userData, ...rest }) {
    // Redirect user if they're not logged in

    return(
        <Route
            {...rest}
            render={(props) =>
                userData && userData.isLoggedIn ? (
                    <Component userData={userData} match={props.match} />
                ) : (
                    <Redirect to={{pathname: "/login", state: { from: props.location.pathname } }} />
                )
            }
        />
    )
}
