import React from 'react';
import Entries from './Entries';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: null
        }
    }

    componentDidMount() {
        fetch("yourapihere", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(res => {
                if (res.success) {
                    this.setState({ entries: res.data })
                } else {
                    console.log("no dice.")
                }
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.entries != null ?
                        <Entries entries={this.state.entries} />
                        :
                        "Nothin'"
                }
            </div>
        );
    }
}

export default View;
