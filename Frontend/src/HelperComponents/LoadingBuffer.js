import React from "react";
import Loading from "./Loading";
import "./LoadingBuffer.css";
import "../Constants/Constants";
import Constants from "../Constants/Constants";

export default class LoadingBuffer extends React.Component {
    // Generates loading screen (props.waiting if supplied, otherwise default)
    // while status of props.loaded is false.

    state = {
        className: "show"
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.showBuffer === true && this.props.showBuffer === false) {
            this.setState({
                className: "hide"
            });
            setTimeout(() => {
                this.setState({
                    className: "hidden"
                });
            }, Constants.loaderTransitionTimeMs);
        } else if (prevProps.showBuffer === false && this.props.showBuffer === true) {
            this.setState({
                className: "show"
            });
            setTimeout(() => {
                this.setState({
                    className: "shown"
                });
            }, Constants.loaderTransitionTimeMs);
        }
    };

    render() {
        let noTransitionOnFirstLoad = this.state.spaFirstLoad ? {} : {transition: "opacity " + Constants.loaderTransitionTimeSe};
        let show = this.state.className;
        return(
            <div>
                <div
                    className={"loader " + show}
                    style={{
                        top: Constants.navBarHeight,
                        height: "90vh",
                        backgroundColor: Constants.backgroundColor,
                        ...noTransitionOnFirstLoad
                    }}
                >
                    <Loading/>
                </div>
            </div>
        )
    }
}
