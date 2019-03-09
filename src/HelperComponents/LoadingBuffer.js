import React from "react";
import Loading from "./Loading";
import "./LoadingBuffer.css";
import "../Constants/Constants";
import Constants from "../Constants/Constants";

export default class LoadingBuffer extends React.Component {
    // Generates loading screen (props.waiting if supplied, otherwise default)
    // while status of props.loaded is false.

    state = {
        transitionDone: false,
        className: "show"
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loaded === false && this.props.loaded === true && this.state.transitionDone !== true) {
            this.setState({
                className: "hide"
            });
            setTimeout(() => {
                this.setState({
                    transitionDone: true,
                    className: "hidden"
                });
            }, Constants.loaderTransitionTimeMs);
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
                        transition: Constants.loaderTransitionTimeSe
                    }}
                >
                    <Loading/>
                </div>
                {
                    this.props.loaded && this.props.children
                }
            </div>
        )
    }
}
