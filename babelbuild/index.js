'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ProfilePage = require('./ProfilePage');

var _ProfilePage2 = _interopRequireDefault(_ProfilePage);

require('./assets/favicon.ico');

require('./index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// second one needed to write the css to file in prod-mode:
//import './index.styl';
//import './index.css';

_reactDom2.default.render(_react2.default.createElement(_ProfilePage2.default, null), document.getElementById('root'));

// needed for hot-reloading in dev-mode to work:
//import '!style!css!stylus!./index.styl';