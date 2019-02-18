import React from "react";
import MyGig from "./MyGig";
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class MyGigEntry extends React.Component {
    state = {
        userData: {
            "id": 1
        }
    };

    render() {
        return(
            <Router>
                <div>
                    {
                        /* TODO: eventual login route logic */
                        /* then pass user data to MyGig component */
                    }
                    <Route path="/" render={() => <MyGig userData={this.state.userData} />} />
                </div>
            </Router>
        )
    }
}