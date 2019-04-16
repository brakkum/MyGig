import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './MyGig.css';
import NavBar from "./DisplayComponents/NavBar";
import MyGigRouter from "./RouteComponents/MyGigRouter";
import Constants from "./Constants/Constants";
import "bulma/css/bulma.css";

const body = document.getElementsByTagName("body")[0];
body.style.backgroundColor = Constants.backgroundColor;

export default class MyGig extends Component {
    // Parent of all components
    // userData stored in state controls all page population
    // TODO: check localstorage in componentDidMount for JWT

    state = {
        // userData contains:
        // eventually: JWT string
        // photoUrl string
        userData: null,
        // loggedIn boolean
        // if redirect is not null
        // page will redirect there
        // and then be reset to null
        loggedIn: false,
        redirect: null,
    };

    // this is called from login page
    // to store necessary userData
    // necessary here for app scope
    loginUser = data => {
        let userData = {...data.user};
        userData.jwt = data.jwt;
        setTimeout(() => {
            this.setState({
                userData: userData,
                loggedIn: true,
                photoUrl: userData.photoUrl
            });
        }, 1000);
        this.setJwtInLocalStorage(data.jwt);
    };

    // clear user info on logout
    logoutUser = () => {
        this.deleteJwtInLocalStorage();
        this.setState({
            userData: null,
            loggedIn: false,
        });
    };

    setJwtInLocalStorage = jwt => {
        localStorage.setItem("jwt", jwt);
    };

    deleteJwtInLocalStorage = () => {
        localStorage.removeItem("jwt");
    };

    // called for page redirects
    // used to redirect to login
    // and then upon success
    // forward to requested route
    redirect = (to, from) => {
        if (to !== from) {
            this.setState({
                showBuffer: true
            });
            setTimeout(() => {
                this.setState({
                    redirect: to
                });
            }, Constants.loaderTransitionTimeMs);
        }
    };

    componentDidMount() {
        //
    };

    // set redirect back to null
    // immediately after redirect
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.redirect != null) {
            this.setState({
                redirect: null
            });
        }
    }

    render() {
        let redirect = this.state.redirect;
        return (
            <div>
                <Router>
                    <div>
                        {
                            redirect && <Redirect to={redirect}/>
                        }
                        <NavBar userData={this.state.userData} />
                        <div>
                            <div style={{maxWidth: Constants.maxBodyWidth, margin: "auto"}}>
                                <MyGigRouter
                                    userData={this.state.userData}
                                    loggedIn={this.state.loggedIn}
                                    loginUser={this.loginUser}
                                    redirect={this.redirect}
                                    pageLoaded={this.pageLoaded}
                                    logoutUser={this.logoutUser}
                                    updateUserPhoto={this.updateUserPhoto}
                                />
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
