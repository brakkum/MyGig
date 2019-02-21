import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './MyGig.css';
import NavBar from "./DisplayComponents/NavBar";
import MyGigRouter from "./RouteComponents/MyGigRouter";

class MyGig extends Component {

    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
        this.state = {
            userData: null,
            redirect: null
        };
    };

    // this is called from login page
    loginUser = id => {
        this.setState({
            userData: {
                id: id,
                isLoggedIn: true
            }
        })
    };

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
                picUrl: "https://i.imgur.com/pDaRVI5.jpg",
                isLoggedIn: true
            }
        })
    };

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
            <Router>
                <div>
                    {
                        redirect && <Redirect to={redirect}/>
                    }
                    <NavBar userData={this.state.userData} redirect={this.redirect} />
                    <div className="body-content">
                        <MyGigRouter userData={this.state.userData} loginUser={this.loginUser} />
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
