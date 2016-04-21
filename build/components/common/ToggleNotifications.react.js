'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ToggleNotifications = function (_Component) {
  _inherits(ToggleNotifications, _Component);

  function ToggleNotifications() {
    _classCallCheck(this, ToggleNotifications);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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
}(_react.Component);

ToggleNotifications.propTypes = {
  isNotificationsEnabled: _react.PropTypes.bool.isRequired,
  onNotificationChange: _react.PropTypes.func.isRequired
};
exports.default = ToggleNotifications;
//# sourceMappingURL=ToggleNotifications.react.js.map