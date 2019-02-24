import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './MyGig.css';
import NavBar from "./DisplayComponents/NavBar";
import MyGigRouter from "./RouteComponents/MyGigRouter";

class MyGig extends Component {
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
        redirect: null
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
                redirect: to
            });
        }
    };

    // so logging in isn't necessary right now
    componentWillMount() {
        this.setState({
            userData: {
                id: 1,
                photoUrl: "https://i.imgur.com/pDaRVI5.jpg",
                isLoggedIn: true
            }
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
                <div>
                    {
                        // redirect if set
                        redirect && <Redirect to={redirect}/>
                    }
                    {/* NavBar for application */}
                    <NavBar userData={this.state.userData} redirect={this.redirect} />
                    {/* all body content contained here */}
                    <div className="body-content">
                        {/* contains all the routing logic */}
                        <MyGigRouter userData={this.state.userData} loginUser={this.loginUser} />
                        {/* navigation for testing */}
                        <div className="test-nav" style={{backgroundColor: "lightgreen", display: "flex", justifyContent: "space-between"}}>
                            <Link to="/">Home</Link>
                            <Link to="/account">Account</Link>
                            <Link to="/notifications">Notifications</Link>
                            <Link to="/public_event/2">Public Event 2</Link>
                            <Link to="/event/3">Private Event 3</Link>
                            <Link to="/ensemble/4">Ensemble 4</Link>
                            <Link to="/connections">Connections</Link>
                            <Link to="/sets/24">Sets for Event 24</Link>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default MyGig;
