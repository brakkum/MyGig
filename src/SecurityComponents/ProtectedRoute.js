import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";

export default function ProtectedRoute({component: Component, userData, ...rest }) {
    // Redirect user if they're not logged in

    return(
        <Route
            {...rest}
            render={(props) =>
                userData && userData.isLoggedIn ? (
                    <Component userData={userData} match={props.match} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}
