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

var CallHeader = function (_Component) {
  (0, _inherits3.default)(CallHeader, _Component);

  function CallHeader() {
    (0, _classCallCheck3.default)(this, CallHeader);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CallHeader.prototype.renderLabel = function renderLabel() {
    if (this.props.isOutgoing) {
      return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.outgoing' });
    }

    return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.incoming' });
  };

  CallHeader.prototype.render = function render() {
    return _react2.default.createElement(
      'header',
      { className: 'call__header' },
      _react2.default.createElement(
        'h2',
        null,
        this.renderLabel()
      )
    );
  };

  return CallHeader;
}(_react.Component);

CallHeader.propTypes = {
  isOutgoing: _react.PropTypes.bool.isRequired
};
exports.default = CallHeader;
//# sourceMappingURL=CallHeader.react.js.map