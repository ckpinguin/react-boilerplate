import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePage from './ProfilePage';

// needed for hot-reloading in dev-mode to work:
import '!style!css!stylus!./index.styl';
//var css = require('!style!css!stylus!./index.styl');

// second one needed to write the css to file in prod-mode:
import './index.styl';
//import './index.css';

ReactDOM.render(
  <ProfilePage />,
  document.getElementById('root')
);
