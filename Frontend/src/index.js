import MyGig from './FrontFacingComponents/MyGig';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

ReactDOM.render(<MyGig />, document.getElementById('root'));

serviceWorker.unregister();
