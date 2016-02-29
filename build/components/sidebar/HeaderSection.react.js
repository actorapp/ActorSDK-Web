'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorClient = require('../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../../utils/EmojiUtils');

var _confirm = require('../../utils/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _SharedContainer = require('../../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _MyProfileActionCreators = require('../../actions/MyProfileActionCreators');

var _MyProfileActionCreators2 = _interopRequireDefault(_MyProfileActionCreators);

var _CreateGroupActionCreators = require('../../actions/CreateGroupActionCreators');

var _CreateGroupActionCreators2 = _interopRequireDefault(_CreateGroupActionCreators);

var _LoginActionCreators = require('../../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _HelpActionCreators = require('../../actions/HelpActionCreators');

var _HelpActionCreators2 = _interopRequireDefault(_HelpActionCreators);

var _AddContactActionCreators = require('../../actions/AddContactActionCreators');

var _AddContactActionCreators2 = _interopRequireDefault(_AddContactActionCreators);

var _PreferencesActionCreators = require('../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _MyProfileStore = require('../../stores/MyProfileStore');

var _MyProfileStore2 = _interopRequireDefault(_MyProfileStore);

var _CreateGroupStore = require('../../stores/CreateGroupStore');

var _CreateGroupStore2 = _interopRequireDefault(_CreateGroupStore);

var _AddContactStore = require('../../stores/AddContactStore');

var _AddContactStore2 = _interopRequireDefault(_AddContactStore);

var _PreferencesStore = require('../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _CreateGroup = require('../modals/CreateGroup');

var _CreateGroup2 = _interopRequireDefault(_CreateGroup);

var _MyProfile = require('../modals/MyProfile.react');

var _MyProfile2 = _interopRequireDefault(_MyProfile);

var _AddContact = require('../modals/AddContact.react');

var _AddContact2 = _interopRequireDefault(_AddContact);

var _Preferences = require('../modals/Preferences.react');

var _Preferences2 = _interopRequireDefault(_Preferences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var HeaderSection = (function (_Component) {
  _inherits(HeaderSection, _Component);

  function HeaderSection(props) {
    _classCallCheck(this, HeaderSection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeaderSection).call(this, props));

    _this.toggleHeaderMenu = function () {
      var isOpened = _this.state.isOpened;

      if (!isOpened) {
        _this.setState({ isOpened: true });
        document.addEventListener('click', _this.closeHeaderMenu, false);
      } else {
        _this.closeHeaderMenu();
      }
    };

    _this.closeHeaderMenu = function () {
      _this.setState({ isOpened: false });
      document.removeEventListener('click', _this.closeHeaderMenu, false);
    };

    _this.openMyProfile = function () {
      return _MyProfileActionCreators2.default.show();
    };

    _this.openCreateGroup = function () {
      return _CreateGroupActionCreators2.default.open();
    };

    _this.openHelpDialog = function () {
      return _HelpActionCreators2.default.open();
    };

    _this.openAddContactModal = function () {
      return _AddContactActionCreators2.default.open();
    };

    _this.onSettingsOpen = function () {
      return _PreferencesActionCreators2.default.show();
    };

    _this.openTwitter = function (event) {
      event.preventDefault();
      if (_ActorClient2.default.isElectron()) {
        _ActorClient2.default.handleLinkClick(event);
      } else {
        window.open('https://twitter.com/' + _this.twitter, '_blank');
      }
    };

    _this.openHomePage = function (event) {
      event.preventDefault();
      if (_ActorClient2.default.isElectron()) {
        _ActorClient2.default.handleLinkClick(event);
      } else {
        window.open(_this.homePage, '_blank');
      }
    };

    _this.setLogout = function () {
      var intl = _this.context.intl;

      (0, _confirm2.default)(intl.messages['modal.confirm.logout'], {
        abortLabel: intl.messages['button.cancel'],
        confirmLabel: intl.messages['button.ok']
      }).then(function () {
        return _LoginActionCreators2.default.setLoggedOut();
      }, function () {});
    };

    var SharedActor = _SharedContainer2.default.get();
    _this.twitter = SharedActor.twitter ? SharedActor.twitter : _ActorAppConstants.twitter;
    _this.homePage = SharedActor.homePage ? SharedActor.homePage : _ActorAppConstants.homePage;
    return _this;
  }

  _createClass(HeaderSection, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ isOpened: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var profile = _state.profile;
      var isOpened = _state.isOpened;
      var isMyProfileOpen = _state.isMyProfileOpen;
      var isCreateGroupOpen = _state.isCreateGroupOpen;
      var isAddContactsOpen = _state.isAddContactsOpen;
      var isPreferencesOpen = _state.isPreferencesOpen;
      var intl = this.context.intl;

      if (profile) {
        var headerClass = (0, _classnames2.default)('sidebar__header', 'sidebar__header--clickable', {
          'sidebar__header--opened': isOpened
        });
        var menuClass = (0, _classnames2.default)('dropdown', {
          'dropdown--opened': isOpened
        });

        return _react2.default.createElement(
          'header',
          { className: headerClass },
          _react2.default.createElement(
            'div',
            { className: 'sidebar__header__user row', onClick: this.toggleHeaderMenu },
            _react2.default.createElement(_AvatarItem2.default, { image: profile.avatar,
              placeholder: profile.placeholder,
              size: 'tiny',
              title: profile.name }),
            _react2.default.createElement('span', { className: 'sidebar__header__user__name col-xs',
              dangerouslySetInnerHTML: { __html: (0, _EmojiUtils.escapeWithEmoji)(profile.name) } }),
            _react2.default.createElement(
              'div',
              { className: menuClass },
              _react2.default.createElement(
                'span',
                { className: 'dropdown__button' },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'arrow_drop_down'
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown__menu dropdown__menu--right' },
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.openMyProfile },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'edit'
                  ),
                  intl.messages['menu.editProfile']
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.openAddContactModal },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'person_add'
                  ),
                  intl.messages['menu.addToContacts']
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.openCreateGroup },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'group_add'
                  ),
                  intl.messages['menu.createGroup']
                ),
                _react2.default.createElement('li', { className: 'dropdown__menu__separator' }),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.onSettingsOpen },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'settings'
                  ),
                  intl.messages['menu.preferences']
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.openHelpDialog },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'help'
                  ),
                  intl.messages['menu.helpAndFeedback']
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item' },
                  _react2.default.createElement(
                    'a',
                    { href: 'https://twitter.com/' + this.twitter, onClick: this.openTwitter },
                    _react2.default.createElement('svg', { className: 'icon icon--dropdown',
                      style: { marginLeft: -34 },
                      dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#twitter"/>' } }),
                    intl.messages['menu.twitter']
                  )
                ),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item' },
                  _react2.default.createElement(
                    'a',
                    { href: this.homePage, onClick: this.openHomePage },
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons' },
                      'public'
                    ),
                    intl.messages['menu.homePage']
                  )
                ),
                _react2.default.createElement('li', { className: 'dropdown__menu__separator' }),
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown__menu__item', onClick: this.setLogout },
                  intl.messages['menu.signOut']
                )
              )
            )
          ),
          isMyProfileOpen ? _react2.default.createElement(_MyProfile2.default, null) : null,
          isCreateGroupOpen ? _react2.default.createElement(_CreateGroup2.default, null) : null,
          isAddContactsOpen ? _react2.default.createElement(_AddContact2.default, null) : null,
          isPreferencesOpen ? _react2.default.createElement(_Preferences2.default, null) : null
        );
      } else {
        return null;
      }
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        profile: _MyProfileStore2.default.getProfile(),
        isMyProfileOpen: _MyProfileStore2.default.isModalOpen(),
        isAddContactsOpen: _AddContactStore2.default.isOpen(),
        isCreateGroupOpen: _CreateGroupStore2.default.isModalOpen(),
        isPreferencesOpen: _PreferencesStore2.default.isOpen()
      };
    }
  }]);

  return HeaderSection;
})(_react.Component);

HeaderSection.getStores = function () {
  return [_MyProfileStore2.default, _CreateGroupStore2.default, _AddContactStore2.default, _PreferencesStore2.default];
};

HeaderSection.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(HeaderSection);
//# sourceMappingURL=HeaderSection.react.js.map