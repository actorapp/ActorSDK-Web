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

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactDetails = function (_Component) {
  (0, _inherits3.default)(ContactDetails, _Component);

  function ContactDetails() {
    (0, _classCallCheck3.default)(this, ContactDetails);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ContactDetails.prototype.renderNickname = function renderNickname() {
    var peerInfo = this.props.peerInfo;

    return peerInfo.nick ? _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--pink', glyph: 'username' }),
      _react2.default.createElement(
        'span',
        { className: 'title' },
        peerInfo.nick
      ),
      _react2.default.createElement(
        'span',
        { className: 'description' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.nickname' })
      )
    ) : null;
  };

  ContactDetails.prototype.renderPhone = function renderPhone() {
    var peerInfo = this.props.peerInfo;

    return peerInfo.phones[0] ? _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'i',
        { className: 'material-icons icon icon--green' },
        'call'
      ),
      _react2.default.createElement(
        'span',
        { className: 'title' },
        _react2.default.createElement(
          'a',
          { href: 'tel:+' + peerInfo.phones[0].number },
          '+' + peerInfo.phones[0].number
        )
      ),
      _react2.default.createElement(
        'span',
        { className: 'description' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.phone' })
      )
    ) : null;
  };

  ContactDetails.prototype.renderEmail = function renderEmail() {
    var peerInfo = this.props.peerInfo;

    return peerInfo.emails[0] ? _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--blue', glyph: 'envelope' }),
      _react2.default.createElement(
        'span',
        { className: 'title' },
        _react2.default.createElement(
          'a',
          { href: 'mailto:' + peerInfo.emails[0].email },
          peerInfo.emails[0].email
        )
      ),
      _react2.default.createElement(
        'span',
        { className: 'description' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.email' })
      )
    ) : null;
  };

  ContactDetails.prototype.render = function render() {

    return _react2.default.createElement(
      'ul',
      { className: 'user_profile__contact_info__list' },
      this.renderNickname(),
      this.renderPhone(),
      this.renderEmail()
    );
  };

  return ContactDetails;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

ContactDetails.propTypes = {
  peerInfo: _react2.default.PropTypes.object.isRequired
};
exports.default = ContactDetails;
//# sourceMappingURL=ContactDetails.react.js.map