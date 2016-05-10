'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactIntl = require('react-intl');

var _EmojiUtils = require('../../../utils/EmojiUtils');

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ContactItem = function (_Component) {
  _inherits(ContactItem, _Component);

  function ContactItem(props) {
    _classCallCheck(this, ContactItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ContactItem.prototype.handleClick = function handleClick(event) {
    event.preventDefault();
    var _props = this.props;
    var onSelect = _props.onSelect;
    var id = _props.id;
    var isContact = _props.isContact;

    onSelect && onSelect(id, isContact);
  };

  ContactItem.prototype.renderAbout = function renderAbout() {
    var about = this.props.about;

    if (!about) return null;

    return _react2.default.createElement(
      'div',
      { className: 'about row' },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.about' }),
        ':'
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-xs' },
        about
      )
    );
  };

  ContactItem.prototype.renderEmails = function renderEmails() {
    var emails = this.props.emails;

    if (emails.length === 0) return null;

    return emails.map(function (email, index) {
      return _react2.default.createElement(
        'div',
        { className: 'email row', key: 'e' + index },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.email' }),
          ':'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + email.email },
            email.email
          )
        )
      );
    });
  };

  ContactItem.prototype.renderPhones = function renderPhones() {
    var phones = this.props.phones;

    if (phones.length === 0) return null;

    return phones.map(function (phone, index) {
      return _react2.default.createElement(
        'div',
        { className: 'phone row', key: 'p' + index },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.phone' }),
          ':'
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'a',
            { href: 'tel:' + phone.number },
            phone.number
          )
        )
      );
    });
  };

  ContactItem.prototype.renderControls = function renderControls() {
    var isContact = this.props.isContact;

    return _react2.default.createElement(
      'button',
      { className: 'button button--rised', onClick: this.handleClick },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: isContact ? 'modal.quickSearch.openDialog' : 'addToContacts' })
    );
  };

  ContactItem.prototype.render = function render() {
    var _props2 = this.props;
    var name = _props2.name;
    var nick = _props2.nick;
    var avatar = _props2.avatar;
    var placeholder = _props2.placeholder;
    var isBot = _props2.isBot;


    return _react2.default.createElement(
      'li',
      { className: 'add-contact__results__item contact' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_AvatarItem2.default, { image: avatar,
          placeholder: placeholder,
          size: 'large',
          title: name }),
        _react2.default.createElement(
          'div',
          { className: 'col-xs' },
          _react2.default.createElement(
            'div',
            { className: 'name' },
            _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(name) } }),
            isBot ? _react2.default.createElement(
              'small',
              null,
              'BOT'
            ) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'nick' },
            nick
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'meta' },
        this.renderAbout(),
        this.renderEmails(),
        this.renderPhones()
      ),
      _react2.default.createElement(
        'div',
        { className: 'controls' },
        this.renderControls()
      )
    );
  };

  return ContactItem;
}(_react.Component);

ContactItem.propTypes = {
  id: _react.PropTypes.number.isRequired,
  name: _react.PropTypes.string.isRequired,
  nick: _react.PropTypes.string,
  avatar: _react.PropTypes.string,
  about: _react.PropTypes.string,
  placeholder: _react.PropTypes.string.isRequired,
  emails: _react.PropTypes.array,
  phones: _react.PropTypes.array,

  isBot: _react.PropTypes.bool.isRequired,
  isContact: _react.PropTypes.bool.isRequired,
  isOnline: _react.PropTypes.bool.isRequired,

  onSelect: _react2.default.PropTypes.func
};
exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map