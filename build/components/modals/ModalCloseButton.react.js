'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalCloseButton = function (_Component) {
  _inherits(ModalCloseButton, _Component);

  function ModalCloseButton(props) {
    _classCallCheck(this, ModalCloseButton);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ModalCloseButton.prototype.handleClick = function handleClick() {
    this.props.onClick();
  };

  ModalCloseButton.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'modal__close-button', onClick: this.handleClick },
      _react2.default.createElement(
        'i',
        { className: 'close_icon material-icons' },
        'close'
      ),
      _react2.default.createElement(
        'div',
        { className: 'text' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.close' })
      )
    );
  };

  return ModalCloseButton;
}(_react.Component);

ModalCloseButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired
};
exports.default = ModalCloseButton;
//# sourceMappingURL=ModalCloseButton.react.js.map