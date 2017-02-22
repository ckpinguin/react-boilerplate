'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('../shared/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _styles = require('./styles.styl');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Greeter = function (_BaseComponent) {
    _inherits(Greeter, _BaseComponent);

    function Greeter(props) {
        _classCallCheck(this, Greeter);

        var _this = _possibleConstructorReturn(this, (Greeter.__proto__ || Object.getPrototypeOf(Greeter)).call(this, props));

        _this.state = {
            greeting: ''
        };
        return _this;
    }

    _createClass(Greeter, [{
        key: 'onGreetingChange',
        value: function onGreetingChange(event) {
            this.setState({ greeting: event.target.value });
        }
    }, {
        key: 'onGreetClicked',
        value: function onGreetClicked() {
            alert('Hello, ' + this.state.greeting);
            this.setState({
                greeting: ''
            });
            // this.inputField a to native DOM element when set
            if (this.inputField) {
                this.inputField.focus();
            }
        }
    }, {
        key: 'getCharsRemaining',
        value: function getCharsRemaining() {
            return this.props.maxLength - this.state.greeting.length;
        }
    }, {
        key: 'hasRemainingChars',
        value: function hasRemainingChars() {
            return this.getCharsRemaining() > 0;
        }
    }, {
        key: 'isGreetingValid',
        value: function isGreetingValid() {
            return this.state.greeting.length > 0 && this.getCharsRemaining() >= 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var greetingValid = this.isGreetingValid();
            return _react2.default.createElement(
                'div',
                null,
                'Greeting:',
                _react2.default.createElement('input', { className: greetingValid ? _styles2.default.valid : _styles2.default.invalid,
                    value: this.state.greeting,
                    onChange: function onChange(e) {
                        return _this2.onGreetingChange(e);
                    },
                    ref: function ref(c) {
                        return _this2.inputField = c;
                    } // set native ref
                }),
                _react2.default.createElement(
                    'span',
                    { style: { color: this.hasRemainingChars() ? 'green' : 'red' } },
                    this.getCharsRemaining()
                ),
                _react2.default.createElement(
                    'button',
                    { disabled: !greetingValid,
                        onClick: function onClick() {
                            return _this2.onGreetClicked();
                        } },
                    'Greet'
                )
            );
        }
    }]);

    return Greeter;
}(_BaseComponent3.default);

exports.default = Greeter;