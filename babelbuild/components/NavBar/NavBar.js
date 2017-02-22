'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('../shared/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_BaseComponent) {
  _inherits(NavBar, _BaseComponent);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));
    /* No more auto-binding in ES6! If we need
    prebinding, it should be done here */
    //this.tick = this.tick.bind(this);
  }

  _createClass(NavBar, [{
    key: 'render',
    value: function render() {
      var pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
      var navLinks = pages.map(function (page) {
        return _react2.default.createElement(
          'a',
          { href: '/' + page },
          page
        );
      });

      return _react2.default.createElement(
        'nav',
        null,
        navLinks
      );
    }
  }]);

  return NavBar;
}(_BaseComponent3.default);

exports.default = NavBar;