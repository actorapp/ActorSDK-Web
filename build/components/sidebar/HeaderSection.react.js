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

var _reactIntl = require('react-intl');

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

var _SvgIcon = require('../common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

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

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var HeaderSection = function (_Component) {
  (0, _inherits3.default)(HeaderSection, _Component);

  function HeaderSection(props) {
    (0, _classCallCheck3.default)(this, HeaderSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

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

    _this.openAddContactModal = function () {
      return _AddContactActionCreators2.default.open();
    };

    _this.onSettingsOpen = function () {
      return _PreferencesActionCreators2.default.show();
    };

    _this.setLogout = function () {
      var intl = _this.context.intl;

      (0, _confirm2.default)(intl.messages['modal.confirm.logout']).then(function () {
        return _LoginActionCreators2.default.setLoggedOut();
      }, function () {});
    };

    _this.openHelp = _this.openHelp.bind(_this);
    _this.openTwitter = _this.openTwitter.bind(_this);
    _this.openFacebook = _this.openFacebook.bind(_this);
    _this.openHomePage = _this.openHomePage.bind(_this);
    return _this;
  }

  HeaderSection.getStores = function getStores() {
    return [_MyProfileStore2.default, _CreateGroupStore2.default, _AddContactStore2.default, _PreferencesStore2.default];
  };

  HeaderSection.calculateState = function calculateState() {
    return {
      profile: _MyProfileStore2.default.getProfile(),
      isMyProfileOpen: _MyProfileStore2.default.isModalOpen(),
      isAddContactsOpen: _AddContactStore2.default.isOpen(),
      isCreateGroupOpen: _CreateGroupStore2.default.isModalOpen(),
      isPreferencesOpen: _PreferencesStore2.default.isOpen()
    };
  };

  HeaderSection.prototype.componentWillMount = function componentWillMount() {
    this.setState({ isOpened: false });
  };

  HeaderSection.prototype.openHelp = function openHelp() {
    _HelpActionCreators2.default.open();
  };

  HeaderSection.prototype.openTwitter = function openTwitter(event) {
    var _SharedContainer$get = _SharedContainer2.default.get();

    var twitter = _SharedContainer$get.twitter;


    event.preventDefault();
    if (_ActorClient2.default.isElectron()) {
      _ActorClient2.default.handleLinkClick(event);
    } else {
      window.open('https://twitter.com/' + twitter, '_blank');
    }
  };

  HeaderSection.prototype.openFacebook = function openFacebook(event) {
    var _SharedContainer$get2 = _SharedContainer2.default.get();

    var facebook = _SharedContainer$get2.facebook;


    event.preventDefault();
    if (_ActorClient2.default.isElectron()) {
      _ActorClient2.default.handleLinkClick(event);
    } else {
      window.open('https://facebook.com/' + facebook, '_blank');
    }
  };

  HeaderSection.prototype.openHomePage = function openHomePage(event) {
    var _SharedContainer$get3 = _SharedContainer2.default.get();

    var homePage = _SharedContainer$get3.homePage;


    event.preventDefault();
    if (_ActorClient2.default.isElectron()) {
      _ActorClient2.default.handleLinkClick(event);
    } else {
      window.open(homePage, '_blank');
    }
  };

  HeaderSection.prototype.renderTwitterLink = function renderTwitterLink() {
    var _SharedContainer$get4 = _SharedContainer2.default.get();

    var twitter = _SharedContainer$get4.twitter;

    if (!twitter) return null;

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item' },
      _react2.default.createElement(
        'a',
        { href: 'https://twitter.com/' + twitter, onClick: this.openTwitter },
        _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--dropdown sidebar__header__twitter', glyph: 'twitter' }),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.twitter' })
      )
    );
  };

  HeaderSection.prototype.renderFacebookLink = function renderFacebookLink() {
    var _SharedContainer$get5 = _SharedContainer2.default.get();

    var facebook = _SharedContainer$get5.facebook;

    if (!facebook) return null;

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item' },
      _react2.default.createElement(
        'a',
        { href: 'https://facebook.com/' + facebook, onClick: this.openFacebook },
        _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--dropdown sidebar__header__facebook', glyph: 'facebook' }),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.facebook' })
      )
    );
  };

  HeaderSection.prototype.renderHomeLink = function renderHomeLink() {
    var _SharedContainer$get6 = _SharedContainer2.default.get();

    var homePage = _SharedContainer$get6.homePage;

    if (!homePage) return null;

    return _react2.default.createElement(
      'li',
      { className: 'dropdown__menu__item' },
      _react2.default.createElement(
        'a',
        { href: homePage, onClick: this.openHomePage },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'public'
        ),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.homePage' })
      )
    );
  };

  HeaderSection.prototype.renderHelpLink = function renderHelpLink() {
    var _SharedContainer$get7 = _SharedContainer2.default.get();

    var helpPhone = _SharedContainer$get7.helpPhone;

    if (!helpPhone) return null;

    if (/@/.test(helpPhone)) {
      return _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item' },
        _react2.default.createElement(
          'a',
          { href: 'mailto:' + helpPhone },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'help'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.helpAndFeedback' })
        )
      );
    } else {
      return _react2.default.createElement(
        'li',
        { className: 'dropdown__menu__item', onClick: this.openHelp },
        _react2.default.createElement(
          'i',
          { className: 'material-icons' },
          'help'
        ),
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.helpAndFeedback' })
      );
    }
  };

  HeaderSection.prototype.render = function render() {
    var _state = this.state;
    var profile = _state.profile;
    var isOpened = _state.isOpened;
    var isMyProfileOpen = _state.isMyProfileOpen;
    var isCreateGroupOpen = _state.isCreateGroupOpen;
    var isAddContactsOpen = _state.isAddContactsOpen;
    var isPreferencesOpen = _state.isPreferencesOpen;


    if (!profile) return null;

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
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.editProfile' })
            ),
            _react2.default.createElement(
              'li',
              { className: 'dropdown__menu__item', onClick: this.openAddContactModal },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'person_add'
              ),
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.addToContacts' })
            ),
            _react2.default.createElement(
              'li',
              { className: 'dropdown__menu__item', onClick: this.openCreateGroup },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'group_add'
              ),
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.createGroup' })
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
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.preferences' })
            ),
            this.renderHelpLink(),
            this.renderTwitterLink(),
            this.renderFacebookLink(),
            this.renderHomeLink(),
            _react2.default.createElement('li', { className: 'dropdown__menu__separator' }),
            _react2.default.createElement(
              'li',
              { className: 'dropdown__menu__item', onClick: this.setLogout },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'menu.signOut' })
            )
          )
        )
      ),
      isMyProfileOpen ? _react2.default.createElement(_MyProfile2.default, null) : null,
      isCreateGroupOpen ? _react2.default.createElement(_CreateGroup2.default, null) : null,
      isAddContactsOpen ? _react2.default.createElement(_AddContact2.default, null) : null,
      isPreferencesOpen ? _react2.default.createElement(_Preferences2.default, null) : null
    );
  };

  return HeaderSection;
}(_react.Component);

HeaderSection.contextTypes = {
  intl: _react.PropTypes.object
};
exports.default = _utils.Container.create(HeaderSection);
//# sourceMappingURL=HeaderSection.react.js.map