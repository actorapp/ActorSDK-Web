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

var ContactDetails = function (_Component) {
  _inherits(ContactDetails, _Component);

  function ContactDetails() {
    _classCallCheck(this, ContactDetails);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ContactDetails.prototype.renderNickname = function renderNickname() {
    var peerInfo = this.props.peerInfo;

    return peerInfo.nick ? _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement('svg', { className: 'icon icon--pink',
        dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#username"/>' } }),
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
      _react2.default.createElement('svg', { className: 'icon icon--blue',
        dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#envelope"/>' } }),
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
}(_react.Component);

ContactDetails.propTypes = {
  peerInfo: _react2.default.PropTypes.object.isRequired
};
exports.default = ContactDetails;
//# sourceMappingURL=ContactDetails.react.js.map