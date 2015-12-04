'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AvatarItem = require('../../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PureRenderMixin = _addons2.default.addons.PureRenderMixin;

var ContactItem = (function (_Component) {
  _inherits(ContactItem, _Component);

  function ContactItem(props) {
    _classCallCheck(this, ContactItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactItem).call(this, props));

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

  _createClass(ContactItem, [{
    key: 'render',
    value: function render() {
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
              'about'
            ),
            about
          ) : null,
          emails[0] ? _react2.default.createElement(
            'div',
            { className: 'email' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'email:'
            ),
            _react2.default.createElement(
              'a',
              { href: 'mailto:' + emails[0].email },
              emails[0].email
            )
          ) : null,
          phones[0] ? _react2.default.createElement(
            'div',
            { className: 'email' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'phone:'
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

            /* TODO: Need to translate */
            isContact ? 'Open conversation' : 'Add to contacts'
          )
        )
      );
    }
  }]);

  return ContactItem;
})(_react.Component);

ContactItem.propTypes = {
  id: _react.PropTypes.number.isRequired,
  name: _react.PropTypes.string.isRequired,
  nick: _react.PropTypes.string.isRequired,
  avatar: _react.PropTypes.string.isRequired,
  about: _react.PropTypes.string.isRequired,
  placeholder: _react.PropTypes.string.isRequired,
  emails: _react.PropTypes.array.isRequired,
  phones: _react.PropTypes.array.isRequired,

  isBot: _react.PropTypes.bool.isRequired,
  isContact: _react.PropTypes.bool.isRequired,
  isOnline: _react.PropTypes.bool.isRequired,

  onSelect: _react2.default.PropTypes.func
};

_reactMixin2.default.onClass(ContactItem, PureRenderMixin);

exports.default = ContactItem;
//# sourceMappingURL=ContactItem.react.js.map