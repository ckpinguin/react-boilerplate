'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ProfilePage = require('../components/ProfilePage/ProfilePage');

var _ProfilePage2 = _interopRequireDefault(_ProfilePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mount = document.getElementById('root');
var profilePage = _react2.default.createElement(_ProfilePage2.default, null);

_reactDom2.default.render(profilePage, mount);