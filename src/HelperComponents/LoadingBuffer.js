import React from "react";
import Loading from "./Loading";
import "./LoadingBuffer.css";
import "../Constants/Constants";
import Constants from "../Constants/Constants";

export default class LoadingBuffer extends React.Component {
    // Generates loading screen (props.waiting if supplied, otherwise default)
    // while status of props.loaded is false.

    state = {
        className: "hidden"
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.loaded === true && prevProps.leaving === false)
            && (this.props.loaded === true && this.props.leaving === true)) {
            // we are now changing pages
            this.setState({
                className: "fadein"
            })
        } else if ((prevProps.loaded === false && this.props.leaving === true)
            && (this.props.loaded === true && this.props.leaving === true)) {
            this.setState({
                className: "hide"
            });
            setTimeout(() => {
                this.setState({
                    className: "hidden"
                });
            }, Constants.loaderTransitionTimeMs)
        }
    };

    render() {
        let show = this.state.className;
        return(
            <div>
                <div
                    className={"loader " + show}
                    style={{
                        top: Constants.navBarHeight,
                        height: "90vh",
                        backgroundColor: Constants.backgroundColor,
                        transition: "opacity " + Constants.loaderTransitionTimeSe
                    }}
                >
                    <Loading/>
                </div>
            </div>
        )
    }
}
