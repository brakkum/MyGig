import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './MyGig.css';
import NavBar from "./DisplayComponents/NavBar";
import MyGigRouter from "./RouteComponents/MyGigRouter";
import Constants from "./Constants/Constants";
import LoadingBuffer from "./HelperComponents/LoadingBuffer";

export default class MyGig extends Component {
    // Parent of all components
    // userData stored in state controls all page population
    // TODO: check localstorage in componentDidMount for JWT

    state = {
        // userData contains:
        // eventually: JWT string
        // isLoggedIn boolean
        // photoUrl string
        userData: null,
        // if redirect is not null
        // page will redirect there
        // and then be reset to null
        redirect: null,
        leaving: false,
        loaded: false
    };

    // this is called from login page
    // to store necessary userData
    // necessary here for app scope
    // TODO: set localstorage on login
    loginUser = id => {
        this.setState({
            userData: {
                // JWT: "", <- this will replace any references to userId eventually
                // photoUrl: "",
                id: id,
                isLoggedIn: true
            }
        })
    };

    // clear user info on logout
    // TODO: remove local storage info
    logoutUser = () => {
        this.setState({
            userData: {
                isLoggedIn: false,
                id: null,
                photoUrl: null,
                // JWT: null
            },
        })
    };

    // called for page redirects
    // used to redirect to login
    // and then upon success
    // forward to requested route
    redirect = (to, from) => {
        if (to !== from) {
            this.setState({
                leaving: true
            });
            setTimeout(() => {
                this.setState({
                    redirect: to,
                    loaded: false
                });
            }, Constants.loaderTransitionTimeMs);
        }
    };

    pageLoaded = () => {
        this.setState({
            loaded: true
        });
        setTimeout(() => {
            this.setState({
                leaving: false
            });
        }, Constants.loaderTransitionTimeMs);
    };

    // so logging in isn't necessary right now
    componentWillMount() {
        // this.setState({
        //     userData: {
        //         id: 1,
        //         photoUrl: "https://i.imgur.com/pDaRVI5.jpg",
        //         isLoggedIn: true,
        //         loaded: true
        //     }
        // })
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
                <div style={{backgroundColor: Constants.backgroundColor}}>
                    {
                        // redirect if set
                        redirect && <Redirect to={redirect}/>
                    }
                    {/* NavBar for application */}
                    <NavBar userData={this.state.userData} redirect={this.redirect} />
                    {
                        <LoadingBuffer loaded={this.state.loaded} leaving={this.state.leaving} />
                    }
                    {/* all body content contained here */}
                    <div className="body-content" style={{backgroundColor: Constants.backgroundColor}}>
                        {/* contains all the routing logic */}
                        <MyGigRouter
                            userData={this.state.userData}
                            loginUser={this.loginUser}
                            redirect={this.redirect}
                            pageLoaded={this.pageLoaded}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}
