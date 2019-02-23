import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyGig from './MyGig';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MyGig />, document.getElementById('root'));

serviceWorker.unregister();
