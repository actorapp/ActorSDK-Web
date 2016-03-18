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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EndButton = function (_Component) {
  (0, _inherits3.default)(EndButton, _Component);

  function EndButton() {
    (0, _classCallCheck3.default)(this, EndButton);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  EndButton.prototype.render = function render() {
    var className = (0, _classnames2.default)('button', {
      'button--rised button--pink button--wide': !this.props.small,
      'button--square col-xs': this.props.small
    });

    return _react2.default.createElement(
      'button',
      { className: className, onClick: this.props.onClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons', key: 'icon' },
        'call_end'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.end', key: 'message' })
    );
  };

  return EndButton;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

EndButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  small: _react.PropTypes.bool
};
exports.default = EndButton;
//# sourceMappingURL=EndButton.react.js.map