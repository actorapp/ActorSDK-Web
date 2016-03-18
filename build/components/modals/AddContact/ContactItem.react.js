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

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _reactIntl = require('react-intl');

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var ContactItem = function (_Component) {
  (0, _inherits3.default)(ContactItem, _Component);

  function ContactItem(props) {
    (0, _classCallCheck3.default)(this, ContactItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.handleClick = function (event) {
      var _this$props = _this.props;
      var onSelect = _this$props.onSelect;
      var id = _this$props.id;
      var isContact = _this$props.isContact;

      event.preventDefault();
      onSelect && onSelect(id, isContact);
    };

    return _this;
  }

  ContactItem.prototype.render = function render() {
    var _props = this.props;
    var name = _props.name;
    var avatar = _props.avatar;
    var about = _props.about;
    var placeholder = _props.placeholder;
    var nick = _props.nick;
    var emails = _props.emails;
    var phones = _props.phones;
    var isBot = _props.isBot;
    var isContact = _props.isContact;


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
        about ? _react2.default.createElement(
          'div',
          { className: 'about' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.about' }),
            ':'
          ),
          about
        ) : null,
        emails[0] ? _react2.default.createElement(
          'div',
          { className: 'email' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.email' }),
            ':'
          ),
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + emails[0].email },
            emails[0].email
          )
        ) : null,
        phones[0] ? _react2.default.createElement(
          'div',
          { className: 'phone' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'profile.phone' }),
            ':'
          ),
          _react2.default.createElement(
            'a',
            { href: 'tel:' + phones[0].email },
            phones[0].number
          )
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'controls' },
        _react2.default.createElement(
          'button',
          { className: 'button button--rised', onClick: this.handleClick },
          isContact ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.quickSearch.openDialog' }) : _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'addToContacts' })
        )
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


_reactMixin2.default.onClass(ContactItem, _reactAddonsPureRenderMixin2.default);

exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map