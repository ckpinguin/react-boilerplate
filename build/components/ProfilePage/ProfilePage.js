'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ProfilePage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavBar = require('./components/NavBar/NavBar.js');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _Button = require('./components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _BouncingBall = require('./components/BouncingBall/BouncingBall');

var _BouncingBall2 = _interopRequireDefault(_BouncingBall);

var _selfie = require('./assets/selfie.jpg');

var _selfie2 = _interopRequireDefault(_selfie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ProfilePage() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_NavBar2.default, null),
        _react2.default.createElement(_BouncingBall2.default, null),
        _react2.default.createElement(
            'h1',
            null,
            'All About Me or so...!'
        ),
        _react2.default.createElement(
            'p',
            null,
            'I like movies and blah blah blah blah blah'
        ),
        _react2.default.createElement(_Button2.default, { text: 'A super cool button' }),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: _selfie2.default })
        )
    );
}