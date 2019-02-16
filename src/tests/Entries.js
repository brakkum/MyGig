import React from 'react';
import Entry from './Entry';

export default class Entries extends React.Component {

    getEntries() {
        let entries = [];
        let i = 1;
        this.props.entries.forEach(entry => {
            entries.push(<Entry data={entry} key={i} />);
            i++;
        });
        return entries;
    }

    render() {
        return(
          <div>
              {
                  this.getEntries()
              }
          </div>
        );
    }
}

