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

var ToggleNotifications = function (_Component) {
  (0, _inherits3.default)(ToggleNotifications, _Component);

  function ToggleNotifications() {
    (0, _classCallCheck3.default)(this, ToggleNotifications);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ToggleNotifications.prototype.render = function render() {
    var _props = this.props;
    var isNotificationsEnabled = _props.isNotificationsEnabled;
    var onNotificationChange = _props.onNotificationChange;


    return _react2.default.createElement(
      'label',
      { htmlFor: 'notifications' },
      _react2.default.createElement(
        'i',
        { className: 'material-icons icon icon--squash' },
        'notifications_none'
      ),
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'notifications' }),
      _react2.default.createElement(
        'div',
        { className: 'switch pull-right' },
        _react2.default.createElement('input', { checked: isNotificationsEnabled,
          id: 'notifications',
          onChange: onNotificationChange,
          type: 'checkbox' }),
        _react2.default.createElement('label', { htmlFor: 'notifications' })
      )
    );
  };

  return ToggleNotifications;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

ToggleNotifications.propTypes = {
  isNotificationsEnabled: _react.PropTypes.bool.isRequired,
  onNotificationChange: _react.PropTypes.func.isRequired
};
exports.default = ToggleNotifications;
//# sourceMappingURL=ToggleNotifications.react.js.map