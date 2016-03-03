'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

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

var _NotificationsActionCreators = require('../../actions/NotificationsActionCreators');

var _NotificationsActionCreators2 = _interopRequireDefault(_NotificationsActionCreators);

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _NotificationsStore = require('../../stores/NotificationsStore');

var _NotificationsStore2 = _interopRequireDefault(_NotificationsStore);

var _OnlineStore = require('../../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _Fold = require('../common/Fold.react');

var _Fold2 = _interopRequireDefault(_Fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores(uid) {
  var thisPeer = uid ? _UserStore2.default.getUser(uid) : null;
  return {
    thisPeer: thisPeer,
    isNotificationsEnabled: thisPeer ? _NotificationsStore2.default.isNotificationsEnabled(thisPeer) : true,
    message: _OnlineStore2.default.getMessage()
  };
};

var UserProfile = (function (_Component) {
  _inherits(UserProfile, _Component);

  UserProfile.getStores = function getStores() {
    return [_NotificationsStore2.default, _OnlineStore2.default];
  };

  UserProfile.calculateState = function calculateState(prevState, nextProps) {
    return getStateFromStores(nextProps.user.id);
  };

  function UserProfile(props) {
    _classCallCheck(this, UserProfile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.addToContacts = function () {
      return _ContactActionCreators2.default.addContact(_this.props.user.id);
    };

    _this.removeFromContacts = function () {
      var user = _this.props.user;

      (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.removeContact', values: { name: user.name } })).then(function () {
        return _ContactActionCreators2.default.removeContact(user.id);
      }, function () {});
    };

    _this.onNotificationChange = function (event) {
      var thisPeer = _this.state.thisPeer;

      _NotificationsActionCreators2.default.changeNotificationsEnabled(thisPeer, event.target.checked);
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
      var intl = _this.context.intl;

      (0, _confirm2.default)(intl.messages['modal.confirm.clear']).then(function () {
        var peer = _ActorClient2.default.getUserPeer(uid);
        _DialogActionCreators2.default.clearChat(peer);
      }, function () {});
    };

    _this.deleteChat = function (uid) {
      var intl = _this.context.intl;

      (0, _confirm2.default)(intl.messages['modal.confirm.delete']).then(function () {
        var peer = _ActorClient2.default.getUserPeer(uid);
        _DialogActionCreators2.default.deleteChat(peer);
      }, function () {});
    };

    _this.handleAvatarClick = function () {
      return _ImageUtils.lightbox.open(_this.props.user.bigAvatar);
    };

    _this.makeCall = function () {
      var user = _this.props.user;

      _CallActionCreators2.default.makeCall(user.id);
    };

    _this.state = {
      isMoreDropdownOpen: false
    };
    return _this;
  }

  UserProfile.prototype.render = function render() {
    var _this2 = this;

    var user = this.props.user;
    var intl = this.context.intl;
    var _state = this.state;
    var isNotificationsEnabled = _state.isNotificationsEnabled;
    var isActionsDropdownOpen = _state.isActionsDropdownOpen;
    var message = _state.message;

    var dropdownClassNames = (0, _classnames2.default)('dropdown', {
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
        intl.messages['profile.nickname']
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
        intl.messages['profile.email']
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
        intl.messages['profile.phone']
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
              { className: 'user_profile__meta__message' },
              message
            )
          ),
          user.about ? _react2.default.createElement('div', { className: 'user_profile__meta__about',
            dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(user.about).replace(/\n/g, '<br/>') } }) : null,
          _react2.default.createElement(
            'footer',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'button',
                { className: 'button button--green button--wide', onClick: this.makeCall },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'phone'
                ),
                intl.messages['button.call']
              )
            ),
            _react2.default.createElement('div', { style: { width: 10 } }),
            _react2.default.createElement(
              'div',
              { className: 'col-xs' },
              _react2.default.createElement(
                'div',
                { className: dropdownClassNames },
                _react2.default.createElement(
                  'button',
                  { className: 'dropdown__button button button--flat button--wide', onClick: this.toggleActionsDropdown },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'more_horiz'
                  ),
                  intl.messages['actions']
                ),
                _react2.default.createElement(
                  'ul',
                  { className: 'dropdown__menu dropdown__menu--right' },
                  user.isContact ? _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.removeFromContacts },
                    intl.messages['removeFromContacts']
                  ) : _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: this.addToContacts },
                    intl.messages['addToContacts']
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: function onClick() {
                        return _this2.clearChat(user.id);
                      } },
                    intl.messages['clearConversation']
                  ),
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown__menu__item', onClick: function onClick() {
                        return _this2.deleteChat(user.id);
                      } },
                    intl.messages['deleteConversation']
                  )
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
            { icon: 'attach_file', iconClassName: 'icon--gray', title: intl.messages['sharedMedia'] },
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
            intl.messages['notifications'],
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
  };

  return UserProfile;
})(_react.Component);

UserProfile.propTypes = {
  user: _react.PropTypes.object.isRequired
};
UserProfile.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(UserProfile, { pure: false, withProps: true });
//# sourceMappingURL=UserProfile.react.js.map