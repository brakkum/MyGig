import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({component: Component, userData, loggedIn, pageLoaded, redirect, updateUserPhoto, ...rest }) {
    // Used on pages that should not be publicly accessible

    return(
        <Route
            {...rest}
            render={(props) => {
                // check that there is a user
                // and that they're logged in
                return loggedIn ? (
                    // if so, take them to what they requested
                    // (more security will occur in the component)
                    <Component
                        redirect={redirect}
                        userData={userData}
                        match={props.match}
                        pageLoaded={pageLoaded}
                        updateUserPhoto={updateUserPhoto}
                    />
                ) : (
                    // if they're not logged in, redirect to login
                    // include requested route
                    <Redirect to={{pathname: "/login", state: { from: props.location.pathname + props.location.hash } }} />
                )}
            }
        />
    )
}
