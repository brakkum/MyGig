import React from 'react';

export default class Entry extends React.Component {

    render() {
        return(
            <div>
                {this.props.data.blog_title}
            </div>
        )
    }
}
