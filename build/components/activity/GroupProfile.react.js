'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

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

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _GroupProfileActionCreators = require('../../actions/GroupProfileActionCreators');

var _GroupProfileActionCreators2 = _interopRequireDefault(_GroupProfileActionCreators);

var _InviteUserActions = require('../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _EditGroupActionCreators = require('../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _PeerStore = require('../../stores/PeerStore');

var _PeerStore2 = _interopRequireDefault(_PeerStore);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _GroupStore = require('../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _InviteUser = require('../modals/InviteUser.react');

var _InviteUser2 = _interopRequireDefault(_InviteUser);

var _InviteByLink = require('../modals/invite-user/InviteByLink.react');

var _InviteByLink2 = _interopRequireDefault(_InviteByLink);

var _GroupProfileMembers = require('../activity/GroupProfileMembers.react');

var _GroupProfileMembers2 = _interopRequireDefault(_GroupProfileMembers);

var _Fold = require('../common/Fold.React');

var _Fold2 = _interopRequireDefault(_Fold);

var _EditGroup = require('../modals/EditGroup.react');

var _EditGroup2 = _interopRequireDefault(_EditGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var getStateFromStores = function getStateFromStores(groupId) {
  var thisPeer = _PeerStore2.default.getGroupPeer(groupId);
  return {
    thisPeer: thisPeer,
    isNotificationsEnabled: _DialogStore2.default.isNotificationsEnabled(thisPeer),
    integrationToken: _GroupStore2.default.getIntegrationToken()
  };
};

var _prevGroupId = undefined;

var GroupProfile = (function (_React$Component) {
  _inherits(GroupProfile, _React$Component);

  function GroupProfile(props) {
    _classCallCheck(this, GroupProfile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupProfile).call(this, props));

    _this.onAddMemberClick = function (group) {
      return _InviteUserActions2.default.show(group);
    };

    _this.onLeaveGroupClick = function (gid) {
      (0, _confirm2.default)(_this.getIntlMessage('modal.confirm.leave'), {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        return _DialogActionCreators2.default.leaveGroup(gid);
      }, function () {});
    };

    _this.onNotificationChange = function (event) {
      var thisPeer = _this.state.thisPeer;

      _DialogActionCreators2.default.changeNotificationsEnabled(thisPeer, event.target.checked);
    };

    _this.onChange = function () {
      return _this.setState(getStateFromStores(_this.props.group.id));
    };

    _this.selectToken = function (event) {
      return event.target.select();
    };

    _this.toggleMoreDropdown = function () {
      var isMoreDropdownOpen = _this.state.isMoreDropdownOpen;

      if (!isMoreDropdownOpen) {
        _this.setState({ isMoreDropdownOpen: true });
        document.addEventListener('click', _this.closeMoreDropdown, false);
      } else {
        _this.closeMoreDropdown();
      }
    };

    _this.closeMoreDropdown = function () {
      _this.setState({ isMoreDropdownOpen: false });
      document.removeEventListener('click', _this.closeMoreDropdown, false);
    };

    _this.onClearGroupClick = function (gid) {
      (0, _confirm2.default)(_this.getIntlMessage('modal.confirm.clear'), {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        var peer = _ActorClient2.default.getGroupPeer(gid);
        _DialogActionCreators2.default.clearChat(peer);
      }, function () {});
    };

    _this.onDeleteGroupClick = function (gid) {
      (0, _confirm2.default)(_this.getIntlMessage('modal.confirm.delete'), {
        abortLabel: _this.getIntlMessage('button.cancel'),
        confirmLabel: _this.getIntlMessage('button.ok')
      }).then(function () {
        var peer = _ActorClient2.default.getGroupPeer(gid);
        _DialogActionCreators2.default.deleteChat(peer);
      }, function () {});
    };

    _this.onEditGroupClick = function (gid) {
      return _EditGroupActionCreators2.default.show(gid);
    };

    _this.handleAvatarClick = function () {
      return _ImageUtils.lightbox.open(_this.props.group.bigAvatar);
    };

    var myId = _UserStore2.default.getMyId();

    _this.state = (0, _lodash.assign)({
      isMoreDropdownOpen: false
    }, getStateFromStores(props.group.id));

    if (props.group.members.length > 0 && myId === props.group.adminId) {
      _GroupProfileActionCreators2.default.getIntegrationToken(props.group.id);
    }

    _DialogStore2.default.addNotificationsListener(_this.onChange);
    _GroupStore2.default.addListener(_this.onChange);
    return _this;
  }

  _createClass(GroupProfile, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _DialogStore2.default.removeNotificationsListener(this.onChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this2 = this;

      var myId = _UserStore2.default.getMyId();
      // FIXME!!!
      setTimeout(function () {
        _this2.setState(getStateFromStores(newProps.group.id));
        if (newProps.group.id !== _prevGroupId && newProps.group.members.length > 0 && myId === newProps.group.adminId) {
          _GroupProfileActionCreators2.default.getIntegrationToken(newProps.group.id);
          _prevGroupId = newProps.group.id;
        }
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var group = this.props.group;
      var _state = this.state;
      var isNotificationsEnabled = _state.isNotificationsEnabled;
      var integrationToken = _state.integrationToken;
      var isMoreDropdownOpen = _state.isMoreDropdownOpen;

      var myId = _UserStore2.default.getMyId();
      var admin = _UserStore2.default.getUser(group.adminId);
      var isMember = _DialogStore2.default.isGroupMember(group);

      var adminControls = undefined;
      if (group.adminId === myId) {
        adminControls = [_react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item hide' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'photo_camera'
          ),
          this.getIntlMessage('setGroupPhoto')
        ), _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item hide' },
          _react2.default.createElement('svg', { className: 'icon icon--dropdown',
            dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#integration"/>' } }),
          this.getIntlMessage('addIntegration')
        ), _react2.default.createElement(
          'li',
          { className: 'dropdown__menu__item', onClick: function onClick() {
              return _this3.onEditGroupClick(group.id);
            } },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'mode_edit'
          ),
          this.getIntlMessage('editGroup')
        )];
      }

      var members = _react2.default.createElement(_reactIntl.FormattedMessage, { message: this.getIntlMessage('members'), numMembers: group.members.length });

      var dropdownClassNames = (0, _classnames2.default)('dropdown', {
        'dropdown--opened': isMoreDropdownOpen
      });

      var iconElement = _react2.default.createElement('svg', { className: 'icon icon--green',
        dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#members"/>' } });

      var groupMeta = [_react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(_AvatarItem2.default, { image: group.bigAvatar,
          placeholder: group.placeholder,
          size: 'large',
          title: group.name,
          onClick: this.handleAvatarClick }),
        _react2.default.createElement('h3', { className: 'group_profile__meta__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.name) } }),
        _react2.default.createElement(
          'div',
          { className: 'group_profile__meta__created' },
          this.getIntlMessage('createdBy'),
          ' ',
          _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(admin.name) } })
        )
      ), group.about ? _react2.default.createElement('div', { className: 'group_profile__meta__description',
        dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.about).replace(/\n/g, '<br/>') } }) : null];

      var token = group.adminId === myId ? _react2.default.createElement(
        'li',
        { className: 'profile__list__item group_profile__integration no-p' },
        _react2.default.createElement(
          _Fold2.default,
          { icon: 'power', iconClassName: 'icon--pink', title: this.getIntlMessage('integrationToken') },
          _react2.default.createElement(
            'div',
            { className: 'info info--light' },
            _react2.default.createElement(
              'p',
              null,
              this.getIntlMessage('integrationTokenHint')
            ),
            _react2.default.createElement(
              'a',
              { href: 'https://actor.readme.io/docs/simple-integration', target: '_blank' },
              this.getIntlMessage('integrationTokenHelp')
            )
          ),
          _react2.default.createElement('textarea', { className: 'textarea', onClick: this.selectToken, readOnly: true, row: '3', value: integrationToken })
        )
      ) : null;

      if (isMember) {
        return _react2.default.createElement(
          'div',
          { className: 'activity__body group_profile' },
          _react2.default.createElement(
            'ul',
            { className: 'profile__list' },
            _react2.default.createElement(
              'li',
              { className: 'profile__list__item group_profile__meta' },
              groupMeta,
              _react2.default.createElement(
                'footer',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs' },
                  _react2.default.createElement(
                    'button',
                    { className: 'button button--flat button--wide',
                      onClick: function onClick() {
                        return _this3.onAddMemberClick(group);
                      } },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'person_add'
                    ),
                    this.getIntlMessage('addPeople')
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
                      { className: 'dropdown__button button button--flat button--wide',
                        onClick: this.toggleMoreDropdown },
                      _react2.default.createElement(
                        'i',
                        { className: 'material-icons' },
                        'more_horiz'
                      ),
                      this.getIntlMessage('more')
                    ),
                    _react2.default.createElement(
                      'ul',
                      { className: 'dropdown__menu dropdown__menu--right' },
                      adminControls,
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this3.onLeaveGroupClick(group.id);
                          } },
                        this.getIntlMessage('leaveGroup')
                      ),
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this3.onClearGroupClick(group.id);
                          } },
                        this.getIntlMessage('clearGroup')
                      ),
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this3.onDeleteGroupClick(group.id);
                          } },
                        this.getIntlMessage('deleteGroup')
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'profile__list__item group_profile__media no-p hide' },
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
              { className: 'profile__list__item group_profile__notifications no-p' },
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
            ),
            _react2.default.createElement(
              'li',
              { className: 'profile__list__item group_profile__members no-p' },
              _react2.default.createElement(
                _Fold2.default,
                { iconElement: iconElement,
                  title: members },
                _react2.default.createElement(_GroupProfileMembers2.default, { groupId: group.id, members: group.members })
              )
            ),
            token
          ),
          _react2.default.createElement(_InviteUser2.default, null),
          _react2.default.createElement(_InviteByLink2.default, null),
          _react2.default.createElement(_EditGroup2.default, null)
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'activity__body group_profile' },
          _react2.default.createElement(
            'ul',
            { className: 'profile__list' },
            _react2.default.createElement(
              'li',
              { className: 'profile__list__item group_profile__meta' },
              groupMeta
            )
          )
        );
      }
    }
  }]);

  return GroupProfile;
})(_react2.default.Component);

GroupProfile.propTypes = {
  group: _react2.default.PropTypes.object.isRequired
};

_reactMixin2.default.onClass(GroupProfile, _reactIntl.IntlMixin);

exports.default = GroupProfile;
//# sourceMappingURL=GroupProfile.react.js.map