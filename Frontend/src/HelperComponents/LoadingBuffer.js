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
        let show = this.state.className;
        return(
            <div>
                <div
                    className={"curtain loader-" + show}
                    style={{
                        transition: "opacity " + Constants.loaderTransitionTimeSe,
                        backgroundColor: Constants.backgroundColor,
                        position: "fixed"
                    }}
                >
                    <Loading/>
                </div>
            </div>
        )
    }
}
