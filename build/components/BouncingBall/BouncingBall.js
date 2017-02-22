'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BouncingBall;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.styl');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BouncingBall() {
    return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement('div', { className: _styles2.default.ball })
    );
}