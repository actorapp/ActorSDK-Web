'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
*/

var CloseButton = function (_Component) {
  (0, _inherits3.default)(CloseButton, _Component);

  function CloseButton() {
    (0, _classCallCheck3.default)(this, CloseButton);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CloseButton.prototype.render = function render() {
    return _react2.default.createElement(
      'button',
      { className: 'button button--rised button--wide', onClick: this.props.onClick },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.close' })
    );
  };

  return CloseButton;
}(_react.Component);

CloseButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired
};
exports.default = CloseButton;
//# sourceMappingURL=CloseButton.react.js.map