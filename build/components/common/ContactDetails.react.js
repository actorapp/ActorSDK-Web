'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ContactDetails = function (_Component) {
  _inherits(ContactDetails, _Component);

  function ContactDetails() {
    _classCallCheck(this, ContactDetails);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ContactDetails.prototype.renderNickname = function renderNickname() {
    var nick = this.props.peerInfo.nick;

    if (!nick) return null;

    return _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--pink', glyph: 'username' }),
      _react2.default.createElement(
        'span',
        { className: 'title' },
        nick
      ),
      _react2.default.createElement(
        'span',
        { className: 'description' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.nickname' })
      )
    );
  };

  ContactDetails.prototype.renderPhone = function renderPhone() {
    var phones = this.props.peerInfo.phones;

    if (phones.length === 0) return null;

    return phones.map(function (phone, index) {
      return _react2.default.createElement(
        'li',
        { key: 'p' + index },
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
            { href: 'tel:+' + phone.number },
            '+' + phone.number
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'description' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.phone' })
        )
      );
    });
  };

  ContactDetails.prototype.renderEmail = function renderEmail() {
    var emails = this.props.peerInfo.emails;

    if (emails.length === 0) return null;

    return emails.map(function (email, index) {
      return _react2.default.createElement(
        'li',
        { key: 'e' + index },
        _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--blue', glyph: 'envelope' }),
        _react2.default.createElement(
          'span',
          { className: 'title' },
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + email.email },
            email.email
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'description' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.email' })
        )
      );
    });
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
}(_react.Component);

ContactDetails.propTypes = {
  peerInfo: _react2.default.PropTypes.object.isRequired
};
exports.default = ContactDetails;
//# sourceMappingURL=ContactDetails.react.js.map