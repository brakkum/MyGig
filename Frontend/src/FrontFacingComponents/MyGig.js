import { BrowserRouter as Router } from "react-router-dom";
import Constants from "../Constants/Constants";
import MyGigRouter from "./MyGigRouter";
import NavBar from "./NavBar";
import "bulma/css/bulma.css";
import React from "react";

export default class MyGig extends React.Component {

    state = {
        user: null,
        jwt: ""
    };

    loginUser = (user, jwt) => {
        this.setState({
            user: user,
            jwt: jwt
        });
        this.setJwtInLocalStorage(jwt);
    };

    logoutUser = () => {
        this.deleteJwtInLocalStorage();
        this.setState({
            user: null
        });
    };

    setJwtInLocalStorage = jwt => {
        localStorage.setItem("jwt", jwt);
    };

    deleteJwtInLocalStorage = () => {
        localStorage.removeItem("jwt");
    };

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <NavBar user={this.state.user} />
                        <div
                            className="is-hidden-mobile"
                            style={{height: "80px"}}
                        />
                        <div>
                            <div style={{width: "100%", maxWidth: Constants.maxBodyWidth, margin: "auto"}}>
                                <MyGigRouter
                                    logoutUser={this.logoutUser}
                                    loginUser={this.loginUser}
                                    user={this.state.user}
                                    jwt={this.state.jwt}
                                />
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
