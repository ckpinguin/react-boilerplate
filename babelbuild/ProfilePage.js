'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('./components/shared/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _NavBar = require('./components/NavBar/NavBar.js');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _Button = require('./components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Greeter = require('./components/Greeter/Greeter');

var _Greeter2 = _interopRequireDefault(_Greeter);

var _selfie = require('./assets/selfie.jpg');

var _selfie2 = _interopRequireDefault(_selfie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Our profile page class (example)
 * @constructor
 */
var ProfilePage = function (_BaseComponent) {
    _inherits(ProfilePage, _BaseComponent);

    function ProfilePage() {
        _classCallCheck(this, ProfilePage);

        return _possibleConstructorReturn(this, (ProfilePage.__proto__ || Object.getPrototypeOf(ProfilePage)).call(this));
        /* No more auto-binding in ES6! If we need
        prebinding, it should be done here or even better,
        use our BaseComponent's _bind method */
        //this.tick = this.tick.bind(this);
    }

    _createClass(ProfilePage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_NavBar2.default, null),
                _react2.default.createElement(
                    'h1',
                    null,
                    'All About Me or so...!'
                ),
                _react2.default.createElement(_Greeter2.default, { maxLength: 10 }),
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
    }]);

    return ProfilePage;
}(_BaseComponent3.default);

exports.default = ProfilePage;