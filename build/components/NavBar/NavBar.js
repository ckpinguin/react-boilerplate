'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = NavBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavBar() {
    var pages = [{
        id: 1,
        name: 'home'
    }, {
        id: 2,
        name: 'blog'
    }, {
        id: 3,
        name: 'pics'
    }, {
        id: 4,
        name: 'bio'
    }, {
        id: 5,
        name: 'about'
    }, {
        id: 6,
        name: 'contact'
    }];
    return _react2.default.createElement(
        'nav',
        null,
        pages.map(function (p) {
            return _react2.default.createElement(
                'a',
                { key: p.id, href: '/' + p.name },
                p.name,
                '\xA0\xA0\xA0'
            );
        })
    );
}