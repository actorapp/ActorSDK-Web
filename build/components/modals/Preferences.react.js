'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _SharedContainer = require('../../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _DelegateContainer = require('../../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _PreferencesActionCreators = require('../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _PreferencesStore = require('../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _Checkbox = require('../common/Checkbox.react');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Session = require('./preferences/Session.react');

var _Session2 = _interopRequireDefault(_Session);

var _BlockedUsers = require('./preferences/BlockedUsers.react');

var _BlockedUsers2 = _interopRequireDefault(_BlockedUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PreferencesModal = function (_Component) {
  _inherits(PreferencesModal, _Component);

  PreferencesModal.getStores = function getStores() {
    return [_PreferencesStore2.default];
  };

  PreferencesModal.calculateState = function calculateState(prevState) {
    return {
      isSendByEnterEnabled: prevState ? prevState.isSendByEnterEnabled : _PreferencesStore2.default.isSendByEnterEnabled(),
      isSoundEffectsEnabled: prevState ? prevState.isSoundEffectsEnabled : _PreferencesStore2.default.isSoundEffectsEnabled(),
      isGroupsNotificationsEnabled: prevState ? prevState.isGroupsNotificationsEnabled : _PreferencesStore2.default.isGroupsNotificationsEnabled(),
      isOnlyMentionNotifications: prevState ? prevState.isOnlyMentionNotifications : _PreferencesStore2.default.isOnlyMentionNotifications(),
      isShowNotificationsTextEnabled: prevState ? prevState.isShowNotificationsTextEnabled : _PreferencesStore2.default.isShowNotificationsTextEnabled(),
      isAnimationAutoPlayEnabled: prevState ? prevState.isAnimationAutoPlayEnabled : _PreferencesStore2.default.isAnimationAutoPlayEnabled(),
      sessions: _PreferencesStore2.default.getSessions(),
      activeTab: _PreferencesStore2.default.getCurrentTab(),
      terminateState: _PreferencesStore2.default.getTerminateState()
    };
  };

  function PreferencesModal(props) {
    _classCallCheck(this, PreferencesModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var SharedActor = _SharedContainer2.default.get();
    _this.appName = SharedActor.appName ? SharedActor.appName : _ActorAppConstants.appName;

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleChangeTab = _this.handleChangeTab.bind(_this);
    _this.toggleSendByEnter = _this.toggleSendByEnter.bind(_this);
    _this.changeSoundEffectsEnabled = _this.changeSoundEffectsEnabled.bind(_this);
    _this.changeGroupsNotificationsEnabled = _this.changeGroupsNotificationsEnabled.bind(_this);
    _this.changeMentionNotifications = _this.changeMentionNotifications.bind(_this);
    _this.changeIsShowNotificationTextEnabled = _this.changeIsShowNotificationTextEnabled.bind(_this);
    _this.changeIsAnimationAutoPlayEnabled = _this.changeIsAnimationAutoPlayEnabled.bind(_this);
    _this.handleTerminateAllSessionsClick = _this.handleTerminateAllSessionsClick.bind(_this);

    _this.components = _this.getComponents();
    return _this;
  }

  PreferencesModal.prototype.getComponents = function getComponents() {
    var _DelegateContainer$ge = _DelegateContainer2.default.get();

    var components = _DelegateContainer$ge.components;


    if (components) {
      return {
        About: (0, _lodash.isFunction)(components.about) ? components.about : null
      };
    }

    return {
      About: null
    };
  };

  PreferencesModal.prototype.handleClose = function handleClose() {
    _PreferencesActionCreators2.default.hide();
  };

  PreferencesModal.prototype.handleSave = function handleSave() {
    var _state = this.state;
    var isSendByEnterEnabled = _state.isSendByEnterEnabled;
    var isSoundEffectsEnabled = _state.isSoundEffectsEnabled;
    var isGroupsNotificationsEnabled = _state.isGroupsNotificationsEnabled;
    var isOnlyMentionNotifications = _state.isOnlyMentionNotifications;
    var isShowNotificationsTextEnabled = _state.isShowNotificationsTextEnabled;
    var isAnimationAutoPlayEnabled = _state.isAnimationAutoPlayEnabled;


    _PreferencesActionCreators2.default.save({
      isSendByEnterEnabled: isSendByEnterEnabled,
      isSoundEffectsEnabled: isSoundEffectsEnabled,
      isGroupsNotificationsEnabled: isGroupsNotificationsEnabled,
      isOnlyMentionNotifications: isOnlyMentionNotifications,
      isShowNotificationsTextEnabled: isShowNotificationsTextEnabled,
      isAnimationAutoPlayEnabled: isAnimationAutoPlayEnabled
    });
    this.handleClose();
  };

  PreferencesModal.prototype.toggleSendByEnter = function toggleSendByEnter(event) {
    this.setState({ isSendByEnterEnabled: event.target.value === 'true' });
  };

  PreferencesModal.prototype.changeSoundEffectsEnabled = function changeSoundEffectsEnabled(event) {
    this.setState({ isSoundEffectsEnabled: event.target.checked });
  };

  PreferencesModal.prototype.changeGroupsNotificationsEnabled = function changeGroupsNotificationsEnabled(event) {
    this.setState({ isGroupsNotificationsEnabled: event.target.checked });
  };

  PreferencesModal.prototype.changeMentionNotifications = function changeMentionNotifications(event) {
    this.setState({ isOnlyMentionNotifications: event.target.checked });
  };

  PreferencesModal.prototype.changeIsShowNotificationTextEnabled = function changeIsShowNotificationTextEnabled(event) {
    this.setState({ isShowNotificationsTextEnabled: event.target.checked });
  };

  PreferencesModal.prototype.changeIsAnimationAutoPlayEnabled = function changeIsAnimationAutoPlayEnabled(event) {
    this.setState({ isAnimationAutoPlayEnabled: event.target.checked });
  };

  PreferencesModal.prototype.handleTerminateAllSessionsClick = function handleTerminateAllSessionsClick() {
    _PreferencesActionCreators2.default.terminateAllSessions();
  };

  PreferencesModal.prototype.handleChangeTab = function handleChangeTab(tab) {
    _PreferencesActionCreators2.default.changeTab(tab);
  };

  PreferencesModal.prototype.renderAppAbout = function renderAppAbout() {
    var _this2 = this;

    var About = this.components.About;

    if (!About) {
      return null;
    }

    var activeTab = this.state.activeTab;

    var aboutTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
      'preferences__tabs__tab--active': activeTab === _ActorAppConstants.PreferencesTabTypes.ABOUT
    });

    return _react2.default.createElement(
      'a',
      { className: aboutTabClassNames, onClick: function onClick() {
          return _this2.handleChangeTab(_ActorAppConstants.PreferencesTabTypes.ABOUT);
        } },
      _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.about.title' })
    );
  };

  PreferencesModal.prototype.renderPreferencesSidebar = function renderPreferencesSidebar() {
    var _this3 = this;

    var activeTab = this.state.activeTab;


    var generalTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
      'preferences__tabs__tab--active': activeTab === _ActorAppConstants.PreferencesTabTypes.GENERAL
    });
    var notificationTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
      'preferences__tabs__tab--active': activeTab === _ActorAppConstants.PreferencesTabTypes.NOTIFICATIONS
    });
    var blockTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
      'preferences__tabs__tab--active': activeTab === _ActorAppConstants.PreferencesTabTypes.BLOCKED
    });
    var securityTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
      'preferences__tabs__tab--active': activeTab === _ActorAppConstants.PreferencesTabTypes.SECURITY
    });

    return _react2.default.createElement(
      'aside',
      { className: 'preferences__tabs' },
      _react2.default.createElement(
        'a',
        { className: generalTabClassNames, onClick: function onClick() {
            return _this3.handleChangeTab(_ActorAppConstants.PreferencesTabTypes.GENERAL);
          } },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.title' })
      ),
      _react2.default.createElement(
        'a',
        { className: notificationTabClassNames, onClick: function onClick() {
            return _this3.handleChangeTab(_ActorAppConstants.PreferencesTabTypes.NOTIFICATIONS);
          } },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.title' })
      ),
      _react2.default.createElement(
        'a',
        { className: blockTabClassNames, onClick: function onClick() {
            return _this3.handleChangeTab(_ActorAppConstants.PreferencesTabTypes.BLOCKED);
          } },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.blocked.title' })
      ),
      _react2.default.createElement(
        'a',
        { className: securityTabClassNames, onClick: function onClick() {
            return _this3.handleChangeTab(_ActorAppConstants.PreferencesTabTypes.SECURITY);
          } },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.title' })
      ),
      this.renderAppAbout()
    );
  };

  PreferencesModal.prototype.renderGeneralTab = function renderGeneralTab() {
    // FIXME: Sometimes radio buttons doesnt checked after changing tab;
    var _state2 = this.state;
    var isSendByEnterEnabled = _state2.isSendByEnterEnabled;
    var isAnimationAutoPlayEnabled = _state2.isAnimationAutoPlayEnabled;


    return _react2.default.createElement(
      'div',
      { className: 'preferences__tabs__content' },
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'keyboard'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.send.title', tagName: 'h4' }),
          _react2.default.createElement(
            'div',
            { className: 'radio' },
            _react2.default.createElement('input', {
              type: 'radio',
              name: 'sendByEnter',
              id: 'sendByEnterEnabled',
              value: 'true',
              checked: isSendByEnterEnabled,
              onChange: this.toggleSendByEnter }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'sendByEnterEnabled' },
              _react2.default.createElement(
                'b',
                null,
                'Enter'
              ),
              ' – ',
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.send.sendMessage' }),
              ', ',
              _react2.default.createElement(
                'b',
                null,
                'Shift + Enter'
              ),
              ' – ',
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.send.newLine' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'radio' },
            _react2.default.createElement('input', {
              type: 'radio',
              name: 'sendByEnter',
              id: 'sendByEnterDisabled',
              value: 'false',
              checked: !isSendByEnterEnabled,
              onChange: this.toggleSendByEnter }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'sendByEnterDisabled' },
              _react2.default.createElement(
                'b',
                null,
                'Cmd + Enter'
              ),
              ' – ',
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.send.sendMessage' }),
              ', ',
              _react2.default.createElement(
                'b',
                null,
                'Enter'
              ),
              ' – ',
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.general.send.newLine' })
            )
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'wallpaper'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.interface.title', tagName: 'h4' }),
          _react2.default.createElement(_Checkbox2.default, {
            id: 'animationAutoPlayEnabled',
            name: 'animationAutoPlayEnabled',
            value: isAnimationAutoPlayEnabled,
            label: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.interface.animation.title' }),
            onChange: this.changeIsAnimationAutoPlayEnabled
          })
        )
      )
    );
  };

  PreferencesModal.prototype.renderNotificationsTab = function renderNotificationsTab() {
    // FIXME: Checkboxes blinking on changing tabs
    var _state3 = this.state;
    var isSoundEffectsEnabled = _state3.isSoundEffectsEnabled;
    var isGroupsNotificationsEnabled = _state3.isGroupsNotificationsEnabled;
    var isOnlyMentionNotifications = _state3.isOnlyMentionNotifications;
    var isShowNotificationsTextEnabled = _state3.isShowNotificationsTextEnabled;


    return _react2.default.createElement(
      'div',
      { className: 'preferences__tabs__content' },
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'music_note'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.effects.title', tagName: 'h4' }),
          _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement('input', {
              type: 'checkbox',
              id: 'soundEffects',
              checked: isSoundEffectsEnabled,
              onChange: this.changeSoundEffectsEnabled }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'soundEffects' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.effects.enable' })
            )
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'notifications'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.notification.title', tagName: 'h4' }),
          _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement('input', {
              type: 'checkbox',
              id: 'groupNotifications',
              checked: isGroupsNotificationsEnabled,
              onChange: this.changeGroupsNotificationsEnabled }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'groupNotifications' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.notification.enable' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement('input', {
              type: 'checkbox',
              id: 'mentionsNotifications',
              checked: isOnlyMentionNotifications,
              onChange: this.changeMentionNotifications }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'mentionsNotifications' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.notification.onlyMentionEnable' })
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'hint' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.notification.onlyMentionHint' })
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'visibility'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.privacy.title', tagName: 'h4' }),
          _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement('input', {
              type: 'checkbox',
              id: 'notificationTextPreview',
              checked: isShowNotificationsTextEnabled,
              onChange: this.changeIsShowNotificationTextEnabled }),
            _react2.default.createElement(
              'label',
              { htmlFor: 'notificationTextPreview' },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.privacy.messagePreview' })
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'hint' },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.notifications.privacy.messagePreviewHint' })
          )
        )
      )
    );
  };

  PreferencesModal.prototype.renderSecurityTab = function renderSecurityTab() {
    return _react2.default.createElement(
      'div',
      { className: 'preferences__tabs__content' },
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'i',
            { className: 'icon material-icons' },
            'devices'
          ),
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.sessions.title', tagName: 'h4' }),
          _react2.default.createElement(
            'ul',
            { className: 'session-list' },
            this.renderSessionList(),
            _react2.default.createElement(
              'li',
              { className: 'session-list__session' },
              _react2.default.createElement(
                'a',
                { className: 'link--red', onClick: this.handleTerminateAllSessionsClick },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.security.sessions.terminateAll' })
              )
            )
          )
        )
      )
    );
  };

  PreferencesModal.prototype.renderSessionList = function renderSessionList() {
    var _state4 = this.state;
    var sessions = _state4.sessions;
    var terminateState = _state4.terminateState;

    return sessions.map(function (session, index) {
      return _react2.default.createElement(_Session2.default, _extends({}, session, {
        key: 's' + index,
        terminateState: terminateState[session.id] || _ActorAppConstants.AsyncActionStates.PENDING
      }));
    });
  };

  PreferencesModal.prototype.renderAboutTab = function renderAboutTab() {
    var About = this.components.About;

    if (!About) {
      return null;
    }

    return _react2.default.createElement(About, null);
  };

  PreferencesModal.prototype.renderCurrentTab = function renderCurrentTab() {
    var activeTab = this.state.activeTab;

    switch (activeTab) {
      case _ActorAppConstants.PreferencesTabTypes.GENERAL:
        return this.renderGeneralTab();
      case _ActorAppConstants.PreferencesTabTypes.NOTIFICATIONS:
        return this.renderNotificationsTab();
      case _ActorAppConstants.PreferencesTabTypes.BLOCKED:
        return _react2.default.createElement(_BlockedUsers2.default, null);
      case _ActorAppConstants.PreferencesTabTypes.SECURITY:
        return this.renderSecurityTab();
      case _ActorAppConstants.PreferencesTabTypes.ABOUT:
        return this.renderAboutTab();
      default:
        return null;
    }
  };

  PreferencesModal.prototype.render = function render() {
    return _react2.default.createElement(
      _reactModal2.default,
      {
        overlayClassName: 'modal-overlay',
        className: 'modal',
        onRequestClose: this.handleClose,
        isOpen: true },
      _react2.default.createElement(
        'div',
        { className: 'preferences' },
        _react2.default.createElement(
          'div',
          { className: 'modal__content' },
          _react2.default.createElement(
            'header',
            { className: 'modal__header' },
            _react2.default.createElement(
              'i',
              { className: 'modal__header__icon material-icons' },
              'settings'
            ),
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'preferences.title', tagName: 'h1' }),
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.handleSave },
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.done' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__body' },
            this.renderPreferencesSidebar(),
            _react2.default.createElement(
              'div',
              { className: 'preferences__body' },
              this.renderCurrentTab()
            )
          )
        )
      )
    );
  };

  return PreferencesModal;
}(_react.Component);

exports.default = _utils.Container.create(PreferencesModal, { pure: false });
//# sourceMappingURL=Preferences.react.js.map