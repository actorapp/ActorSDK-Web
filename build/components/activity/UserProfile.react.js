'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ImageUtils = require('../../utils/ImageUtils');

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _ContactActionCreators = require('../../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _PeerStore = require('../../stores/PeerStore');

var _PeerStore2 = _interopRequireDefault(_PeerStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Fold = require('../common/Fold.React');

var _Fold2 = _interopRequireDefault(_Fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores(userId) {
  var thisPeer = _PeerStore2.default.getUserPeer(userId);
  return {
    thisPeer: thisPeer,
    isNotificationsEnabled: _DialogStore2.default.isNotificationsEnabled(thisPeer)
  };
};

var UserProfile = (function (_React$Component) {
  _inherits(UserProfile, _React$Component);

  function UserProfile(props) {
    _classCallCheck(this, UserProfile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserProfile).call(this, props));

    _this.addToContacts = function () {
      _ContactActionCreators2.default.addContact(_this.props.user.id);
    };

    _this.removeFromContacts = function () {
      var user = _this.props.user;

      var confirmText = _react2.default.createElement(_reactIntl.FormattedMessage, { message: _this.getIntlMessage('modal.confirm.removeContact'),
        name: user.name });
      (0, _confirm2.default)(confirmText, {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        return _ContactActionCreators2.default.removeContact(user.id);
      }, function () {});
    };

    _this.onNotificationChange = function (event) {
      var thisPeer = _this.state.thisPeer;

      _DialogActionCreators2.default.changeNotificationsEnabled(thisPeer, event.target.checked);
    };

    _this.onChange = function () {
      var user = _this.props.user;

      _this.setState(getStateFromStores(user.id));
    };

    _this.toggleActionsDropdown = function () {
      var isActionsDropdownOpen = _this.state.isActionsDropdownOpen;

      if (!isActionsDropdownOpen) {
        _this.setState({ isActionsDropdownOpen: true });
        document.addEventListener('click', _this.closeActionsDropdown, false);
      } else {
        _this.closeActionsDropdown();
      }
    };

    _this.closeActionsDropdown = function () {
      _this.setState({ isActionsDropdownOpen: false });
      document.removeEventListener('click', _this.closeActionsDropdown, false);
    };

    _this.clearChat = function (uid) {
      (0, _confirm2.default)(_this.getIntlMessage('modal.confirm.clear'), {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        var peer = _ActorClient2.default.getUserPeer(uid);
        _DialogActionCreators2.default.clearChat(peer);
      }, function () {});
    };

    _this.deleteChat = function (uid) {
      (0, _confirm2.default)(_this.getIntlMessage('modal.confirm.delete'), {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        var peer = _ActorClient2.default.getUserPeer(uid);
        _DialogActionCreators2.default.deleteChat(peer);
      }, function () {});
    };

    _this.handleAvatarClick = function () {
      return _ImageUtils.lightbox.open(_this.props.user.bigAvatar);
    };

    _this.state = _lodash2.default.assign({
      isActionsDropdownOpen: false
    }, getStateFromStores(props.user.id));

    _DialogStore2.default.addNotificationsListener(_this.onChange);
    return _this;
  }

  _createClass(UserProfile, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DialogStore2.default.removeNotificationsListener(this.onChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(getStateFromStores(newProps.user.id));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var user = this.props.user;
      var _state = this.state;
      var isNotificationsEnabled = _state.isNotificationsEnabled;
      var isActionsDropdownOpen = _state.isActionsDropdownOpen;

      var dropdownClassNames = (0, _classnames2.default)('dropdown pull-left', {
        'dropdown--opened': isActionsDropdownOpen
      });

      var nickname = user.nick ? _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement('svg', { className: 'icon icon--pink',
          dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#username"/>' } }),
        _react2.default.createElement(
          'span',
          { className: 'title' },
          user.nick
        ),
        _react2.default.createElement(
          'span',
          { className: 'description' },
          this.getIntlMessage('profile.nickname')
        )
      ) : null;

      var email = user.emails[0] ? _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement('svg', { className: 'icon icon--blue',
          dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#envelope"/>' } }),
        _react2.default.createElement(
          'span',
          { className: 'title' },
          _react2.default.createElement(
            'a',
            { href: 'mailto:' + user.emails[0].email },
            user.emails[0].email
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'description' },
          this.getIntlMessage('profile.email')
        )
      ) : null;

      var phone = user.phones[0] ? _react2.default.createElement(
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
            { href: 'tel:+' + user.phones[0].number },
            '+' + user.phones[0].number
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'description' },
          this.getIntlMessage('profile.phone')
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: 'activity__body user_profile' },
        _react2.default.createElement(
          'ul',
          { className: 'profile__list' },
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item user_profile__meta' },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(_AvatarItem2.default, { image: user.bigAvatar,
                placeholder: user.placeholder,
                size: 'large',
                title: user.name,
                onClick: this.handleAvatarClick }),
              _react2.default.createElement('h3', { className: 'user_profile__meta__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(user.name) } }),
              _react2.default.createElement(
                'div',
                { className: 'user_profile__meta__presence' },
                user.presence
              )
            ),
            user.about ? _react2.default.createElement('div', { className: 'user_profile__meta__about',
              dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(user.about).replace(/\n/g, '<br/>') } }) : null,
            _react2.default.createElement(
              'footer',
              null,
              _react2.default.createElement(
                'div',
                { className: dropdownClassNames },
                _react2.default.createElement(
                  'button',
                  { className: 'dropdown__button button button--flat', onClick: this.toggleActionsDropdown },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'more_horiz'
                  ),
                  this.getIntlMessage('actions')
                ),
                _react2.default.createElement(
                  'ul',
                  { className: 'dropdown__menu dropdown__menu--left' },
                  user.isContact ? _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.removeFromContacts },
                    this.getIntlMessage('removeFromContacts')
                  ) : _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.addToContacts },
                    this.getIntlMessage('addToContacts')
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: function onClick() {
                        return _this2.clearChat(user.id);
                      } },
                    this.getIntlMessage('clearConversation')
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: function onClick() {
                        return _this2.deleteChat(user.id);
                      } },
                    this.getIntlMessage('deleteConversation')
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item user_profile__contact_info no-p' },
            _react2.default.createElement(
              'ul',
              { className: 'user_profile__contact_info__list' },
              phone,
              email,
              nickname
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item user_profile__media no-p hide' },
            _react2.default.createElement(
              _Fold2.default,
              { icon: 'attach_file', iconClassName: 'icon--gray', title: this.getIntlMessage('sharedMedia') },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    null,
                    '230 Shared Photos and Videos'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    null,
                    '49 Shared Links'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    null,
                    '49 Shared Files'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'profile__list__item user_profile__notifications no-p' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'notifications' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons icon icon--squash' },
                'notifications_none'
              ),
              this.getIntlMessage('notifications'),
              _react2.default.createElement(
                'div',
                { className: 'switch pull-right' },
                _react2.default.createElement('input', { checked: isNotificationsEnabled,
                  id: 'notifications',
                  onChange: this.onNotificationChange,
                  type: 'checkbox' }),
                _react2.default.createElement('label', { htmlFor: 'notifications' })
              )
            )
          )
        )
      );
    }
  }]);

  return UserProfile;
})(_react2.default.Component);

UserProfile.propTypes = {
  user: _react2.default.PropTypes.object.isRequired
};

_reactMixin2.default.onClass(UserProfile, _reactIntl.IntlMixin);

exports.default = UserProfile;
//# sourceMappingURL=UserProfile.react.js.map