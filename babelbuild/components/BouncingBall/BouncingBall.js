'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styles = require('./styles.styl');

var _styles2 = _interopRequireDefault(_styles);

var _BaseComponent2 = require('../shared/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BouncingBall = function (_BaseComponent) {
  _inherits(BouncingBall, _BaseComponent);

  function BouncingBall() {
    _classCallCheck(this, BouncingBall);

    return _possibleConstructorReturn(this, (BouncingBall.__proto__ || Object.getPrototypeOf(BouncingBall)).apply(this, arguments));
  }

  _createClass(BouncingBall, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: _styles2.default.root },
        React.createElement('div', { className: _styles2.default.ball })
      );
    }
  }]);

  return BouncingBall;
}(_BaseComponent3.default);

exports.default = BouncingBall;
;