import { BrowserRouter as Router } from "react-router-dom";
import Constants from "../Constants/Constants";
import MyGigRouter from "./MyGigRouter";
import NavBar from "./NavBar";
import "bulma/css/bulma.css";
import React from "react";

const html = document.getElementsByTagName("html")[0];
html.style.backgroundColor = Constants.backgroundColor;

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
                        <div>
                            <div style={{maxWidth: Constants.maxBodyWidth, margin: "auto"}}>
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