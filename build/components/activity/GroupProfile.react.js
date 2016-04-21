'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _ImageUtils = require('../../utils/ImageUtils');

var _utils = require('flux/utils');

var _Scrollbar = require('../common/Scrollbar.react');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _DialogActionCreators = require('../../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _InviteUserActions = require('../../actions/InviteUserActions');

var _InviteUserActions2 = _interopRequireDefault(_InviteUserActions);

var _EditGroupActionCreators = require('../../actions/EditGroupActionCreators');

var _EditGroupActionCreators2 = _interopRequireDefault(_EditGroupActionCreators);

var _NotificationsActionCreators = require('../../actions/NotificationsActionCreators');

var _NotificationsActionCreators2 = _interopRequireDefault(_NotificationsActionCreators);

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _DialogStore = require('../../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _NotificationsStore = require('../../stores/NotificationsStore');

var _NotificationsStore2 = _interopRequireDefault(_NotificationsStore);

var _GroupStore = require('../../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _OnlineStore = require('../../stores/OnlineStore');

var _OnlineStore2 = _interopRequireDefault(_OnlineStore);

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _GroupProfileMembers = require('../activity/GroupProfileMembers.react');

var _GroupProfileMembers2 = _interopRequireDefault(_GroupProfileMembers);

var _Fold = require('../common/Fold.react');

var _Fold2 = _interopRequireDefault(_Fold);

var _ToggleNotifications = require('../common/ToggleNotifications.react');

var _ToggleNotifications2 = _interopRequireDefault(_ToggleNotifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MAX_GROUP_CALL_SIZE = 25;

var GroupProfile = function (_Component) {
  _inherits(GroupProfile, _Component);

  GroupProfile.getStores = function getStores() {
    return [_NotificationsStore2.default, _GroupStore2.default, _OnlineStore2.default];
  };

  GroupProfile.calculateState = function calculateState(prevState, nextProps) {
    var gid = nextProps.group.id;
    var peer = gid ? _GroupStore2.default.getGroup(gid) : null;
    return {
      peer: peer,
      // should not require to pass a peer
      isNotificationsEnabled: peer ? _NotificationsStore2.default.isNotificationsEnabled(peer) : true,
      integrationToken: _GroupStore2.default.getToken(),
      message: _OnlineStore2.default.getMessage()
    };
  };

  function GroupProfile(props) {
    _classCallCheck(this, GroupProfile);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onAddMemberClick = function (group) {
      return _InviteUserActions2.default.show(group);
    };

    _this.onNotificationChange = function (event) {
      var peer = _this.state.peer;

      _NotificationsActionCreators2.default.changeNotificationsEnabled(peer, event.target.checked);
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
      var group = _this.props.group;


      (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.group.clear', values: { name: group.name } })).then(function () {
        var peer = _ActorClient2.default.getGroupPeer(gid);
        _DialogActionCreators2.default.clearChat(peer);
      }, function () {});
    };

    _this.onLeaveGroupClick = function (gid) {
      var group = _this.props.group;


      (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.group.leave', values: { name: group.name } })).then(function () {
        return _DialogActionCreators2.default.leaveGroup(gid);
      }, function () {});
    };

    _this.onDeleteGroupClick = function (gid) {
      var group = _this.props.group;


      (0, _confirm2.default)(_react2.default.createElement(_reactIntl.FormattedMessage, { id: 'modal.confirm.group.delete', values: { name: group.name } })).then(function () {
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

    _this.makeCall = function () {
      var group = _this.props.group;

      _CallActionCreators2.default.makeGroupCall(group.id);
    };

    _this.state = {
      isMoreDropdownOpen: false
    };
    return _this;
  }

  GroupProfile.prototype.render = function render() {
    var _this2 = this;

    var group = this.props.group;
    var _state = this.state;
    var isNotificationsEnabled = _state.isNotificationsEnabled;
    var integrationToken = _state.integrationToken;
    var isMoreDropdownOpen = _state.isMoreDropdownOpen;
    var message = _state.message;
    var intl = this.context.intl;


    var myId = _UserStore2.default.getMyId();
    var admin = _UserStore2.default.getUser(group.adminId);
    var isMember = _DialogStore2.default.isMember();

    var dropdownClassNames = (0, _classnames2.default)('dropdown', {
      'dropdown--opened': isMoreDropdownOpen
    });

    var iconElement = _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--green', glyph: 'members' });

    var groupMeta = [_react2.default.createElement(
      'header',
      { key: 1 },
      _react2.default.createElement(_AvatarItem2.default, { image: group.bigAvatar,
        placeholder: group.placeholder,
        size: 'large',
        title: group.name,
        onClick: this.handleAvatarClick }),
      _react2.default.createElement('h3', { className: 'group_profile__meta__title', dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.name) } }),
      _react2.default.createElement(
        'div',
        { className: 'group_profile__meta__created' },
        intl.messages['createdBy'],
        ' ',
        _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(admin.name) } })
      )
    ), group.about ? _react2.default.createElement('div', { className: 'group_profile__meta__description', key: 2,
      dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(group.about).replace(/\n/g, '<br/>') } }) : null];

    var token = group.adminId === myId ? _react2.default.createElement(
      'li',
      { className: 'profile__list__item group_profile__integration no-p' },
      _react2.default.createElement(
        _Fold2.default,
        { icon: 'power', iconClassName: 'icon--pink', title: intl.messages['integrationToken'] },
        _react2.default.createElement(
          'div',
          { className: 'info info--light' },
          _react2.default.createElement(
            'p',
            null,
            intl.messages['integrationTokenHint']
          ),
          _react2.default.createElement(
            'a',
            { href: 'https://actor.readme.io/docs/simple-integration', target: '_blank' },
            intl.messages['integrationTokenHelp']
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
          _Scrollbar2.default,
          null,
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
                  group.members.length < MAX_GROUP_CALL_SIZE ? _react2.default.createElement(
                    'button',
                    { className: 'button button--green button--wide', onClick: this.makeCall },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'phone'
                    ),
                    intl.messages['button.call']
                  ) : _react2.default.createElement(
                    'button',
                    { className: 'button button--flat button--wide',
                      onClick: function onClick() {
                        return _this2.onAddMemberClick(group);
                      } },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'person_add'
                    ),
                    intl.messages['addPeople']
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
                      intl.messages['more']
                    ),
                    _react2.default.createElement(
                      'ul',
                      { className: 'dropdown__menu dropdown__menu--right' },
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item', onClick: function onClick() {
                            return _this2.onEditGroupClick(group.id);
                          } },
                        _react2.default.createElement(
                          'i',
                          { className: 'material-icons' },
                          'mode_edit'
                        ),
                        intl.messages['editGroup']
                      ),
                      group.members.length < MAX_GROUP_CALL_SIZE ? _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item', onClick: function onClick() {
                            return _this2.onAddMemberClick(group);
                          } },
                        _react2.default.createElement(
                          'i',
                          { className: 'material-icons' },
                          'person_add'
                        ),
                        intl.messages['addPeople']
                      ) : null,
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this2.onLeaveGroupClick(group.id);
                          } },
                        intl.messages['leaveGroup']
                      ),
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this2.onClearGroupClick(group.id);
                          } },
                        intl.messages['clearGroup']
                      ),
                      _react2.default.createElement(
                        'li',
                        { className: 'dropdown__menu__item',
                          onClick: function onClick() {
                            return _this2.onDeleteGroupClick(group.id);
                          } },
                        intl.messages['deleteGroup']
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
              { className: 'profile__list__item group_profile__notifications no-p' },
              _react2.default.createElement(_ToggleNotifications2.default, { isNotificationsEnabled: isNotificationsEnabled, onNotificationChange: this.onNotificationChange })
            ),
            _react2.default.createElement(
              'li',
              { className: 'profile__list__item group_profile__members no-p' },
              _react2.default.createElement(
                _Fold2.default,
                { iconElement: iconElement,
                  title: message },
                _react2.default.createElement(_GroupProfileMembers2.default, { groupId: group.id, members: group.members })
              )
            ),
            token
          )
        )
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
  };

  return GroupProfile;
}(_react.Component);

GroupProfile.contextTypes = {
  intl: _react.PropTypes.object
};
GroupProfile.propTypes = {
  group: _react.PropTypes.object.isRequired
};
exports.default = _utils.Container.create(GroupProfile, { pure: false, withProps: true });
//# sourceMappingURL=GroupProfile.react.js.map