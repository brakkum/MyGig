import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './MyGig.css';
import NavBar from "./DisplayComponents/NavBar";
import MyGigRouter from "./RouteComponents/MyGigRouter";
import Constants from "./Constants/Constants";
import LoadingBuffer from "./HelperComponents/LoadingBuffer";
import "bulma/css/bulma.css";

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
        showBuffer: true,
        photoUrl: null
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

    updateUserPhoto = url => {
        this.setState({
            photoUrl: url
        });
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

    pageLoaded = () => {
        this.setState({
            showBuffer: false
        });
    };

    componentDidMount() {
        // this is necessary to show loading
        // screen on app load
        this.setState({
            showBuffer: true
        })
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
        // check for redirect
        let redirect = this.state.redirect;
        return (
            // entire application lives inside router
            <Router>
                <body style={{backgroundColor: Constants.backgroundColor}} className={"body"}>
                    {
                        // redirect if set
                        redirect && <Redirect to={redirect}/>
                    }
                    {
                        <LoadingBuffer showBuffer={this.state.showBuffer} />
                    }
                    {/* NavBar for application */}
                    <NavBar userData={this.state.userData} photoUrl={this.state.photoUrl} redirect={this.redirect} logoutUser={this.logoutUser} />
                    {/* all body content contained here */}
                    {/*<div style={{ height: "50px"}}>{}</div>*/}
                    <div className="body-content" style={{backgroundColor: Constants.backgroundColor}}>
                        {/* contains all the routing logic */}
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
                        <div style={{ height: "50px"}}>{}</div>
                    </div>
                </body>
            </Router>
        );
    }
}
