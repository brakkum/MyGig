import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({component: Component, user, pageLoaded, redirect, updateUserPhoto, ...rest }) {
    // Used on pages that should not be publicly accessible

    return(
        <Route
            {...rest}
            render={(props) => {
                // check that there is a user
                return user !== null ? (
                    // if so, take them to what they requested
                    <Component
                        user={user}
                        match={props.match}
                    />
                ) : (
                    // if not, redirect to login
                    // include requested route
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location.pathname + props.location.hash
                            }
                        }}
                    />
                )}
            }
        />
    )
}
