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

var AnswerButton = function (_Component) {
  (0, _inherits3.default)(AnswerButton, _Component);

  function AnswerButton() {
    (0, _classCallCheck3.default)(this, AnswerButton);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  AnswerButton.prototype.render = function render() {
    var className = (0, _classnames2.default)('button', {
      'button--rised button--wide': !this.props.small,
      'button--square col-xs': this.props.small
    });

    return _react2.default.createElement(
      'button',
      { className: className, onClick: this.props.onClick },
      _react2.default.createElement(
        'i',
        { className: 'material-icons', key: 'icon' },
        'call'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.answer' })
    );
  };

  return AnswerButton;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

AnswerButton.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  small: _react.PropTypes.bool
};
exports.default = AnswerButton;
//# sourceMappingURL=AnswerButton.react.js.map