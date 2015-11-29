'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _PreferencesActionCreators = require('../../actions/PreferencesActionCreators');

var _PreferencesActionCreators2 = _interopRequireDefault(_PreferencesActionCreators);

var _PreferencesStore = require('../../stores/PreferencesStore');

var _PreferencesStore2 = _interopRequireDefault(_PreferencesStore);

var _Session = require('./preferences/Session.react');

var _Session2 = _interopRequireDefault(_Session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PreferencesModal = (function (_Component) {
  _inherits(PreferencesModal, _Component);

  function PreferencesModal(props) {
    _classCallCheck(this, PreferencesModal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreferencesModal).call(this, props));

    _this.onClose = function () {
      return _PreferencesActionCreators2.default.hide();
    };

    _this.onDone = function () {
      var _this$state = _this.state;
      var isSendByEnterEnabled = _this$state.isSendByEnterEnabled;
      var isSoundEffectsEnabled = _this$state.isSoundEffectsEnabled;
      var isGroupsNotificationsEnabled = _this$state.isGroupsNotificationsEnabled;
      var isOnlyMentionNotifications = _this$state.isOnlyMentionNotifications;
      var isShowNotificationsTextEnabled = _this$state.isShowNotificationsTextEnabled;

      _PreferencesActionCreators2.default.save({
        isSendByEnterEnabled: isSendByEnterEnabled,
        isSoundEffectsEnabled: isSoundEffectsEnabled,
        isGroupsNotificationsEnabled: isGroupsNotificationsEnabled,
        isOnlyMentionNotifications: isOnlyMentionNotifications,
        isShowNotificationsTextEnabled: isShowNotificationsTextEnabled
      });
      _this.onClose();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.onClose();
      }
    };

    _this.changeSendByEnter = function (event) {
      return _this.setState({ isSendByEnterEnabled: event.target.value === 'true' });
    };

    _this.changeSoundEffectsEnabled = function (event) {
      return _this.setState({ isSoundEffectsEnabled: event.target.checked });
    };

    _this.changeGroupsNotificationsEnabled = function (event) {
      return _this.setState({ isGroupsNotificationsEnabled: event.target.checked });
    };

    _this.changeMentionNotifications = function (event) {
      return _this.setState({ isOnlyMentionNotifications: event.target.checked });
    };

    _this.changeIsShowNotificationTextEnabled = function (event) {
      return _this.setState({ isShowNotificationsTextEnabled: event.target.checked });
    };

    _this.onTerminateAllSessionsClick = function () {
      return _PreferencesActionCreators2.default.terminateAllSessions();
    };

    _this.changeTab = function (tab) {
      return _PreferencesActionCreators2.default.changeTab(tab);
    };

    return _this;
  }

  _createClass(PreferencesModal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      document.addEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var isOpen = _state.isOpen;
      var activeTab = _state.activeTab;
      var isSendByEnterEnabled = _state.isSendByEnterEnabled;
      var isSoundEffectsEnabled = _state.isSoundEffectsEnabled;
      var isGroupsNotificationsEnabled = _state.isGroupsNotificationsEnabled;
      var isOnlyMentionNotifications = _state.isOnlyMentionNotifications;
      var isShowNotificationsTextEnabled = _state.isShowNotificationsTextEnabled;
      var sessions = _state.sessions;

      var sessionList = (0, _lodash.map)(sessions, function (session) {
        return _react2.default.createElement(_Session2.default, session);
      });

      var generalTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
        'preferences__tabs__tab--active': activeTab === 'GENERAL'
      });
      var notificationTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
        'preferences__tabs__tab--active': activeTab === 'NOTIFICATIONS'
      });
      var securityTabClassNames = (0, _classnames2.default)('preferences__tabs__tab', {
        'preferences__tabs__tab--active': activeTab === 'SECURITY'
      });
      var generalTabContentClassName = (0, _classnames2.default)('preferences__list__item', {
        'preferences__list__item--active': activeTab === 'GENERAL'
      });
      var notificationTabContentClassName = (0, _classnames2.default)('preferences__list__item', {
        'preferences__list__item--active': activeTab === 'NOTIFICATIONS'
      });
      var securityTabContentClassName = (0, _classnames2.default)('preferences__list__item', {
        'preferences__list__item--active': activeTab === 'SECURITY'
      });

      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--preferences',
          closeTimeoutMS: 150,
          isOpen: isOpen,
          style: { width: 760 } },
        _react2.default.createElement(
          'div',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'i',
            { className: 'modal-new__header__icon material-icons' },
            'settings'
          ),
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            this.getIntlMessage('preferencesModalTitle')
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(
              'button',
              { className: 'button button--lightblue', onClick: this.onDone },
              this.getIntlMessage('button.done')
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body' },
          _react2.default.createElement(
            'div',
            { className: 'preferences' },
            _react2.default.createElement(
              'aside',
              { className: 'preferences__tabs' },
              _react2.default.createElement(
                'a',
                { className: generalTabClassNames,
                  onClick: function onClick() {
                    return _this2.changeTab('GENERAL');
                  } },
                this.getIntlMessage('preferencesGeneralTab')
              ),
              _react2.default.createElement(
                'a',
                { className: notificationTabClassNames,
                  onClick: function onClick() {
                    return _this2.changeTab('NOTIFICATIONS');
                  } },
                this.getIntlMessage('preferencesNotificationsTab')
              ),
              _react2.default.createElement(
                'a',
                { className: securityTabClassNames,
                  onClick: function onClick() {
                    return _this2.changeTab('SECURITY');
                  } },
                this.getIntlMessage('preferencesSecurityTab')
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'preferences__body' },
              _react2.default.createElement(
                'div',
                { className: 'preferences__list' },
                _react2.default.createElement(
                  'div',
                  { className: generalTabContentClassName },
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
                      _react2.default.createElement(
                        'h4',
                        null,
                        this.getIntlMessage('preferencesSendMessageTitle')
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'radio' },
                        _react2.default.createElement('input', { type: 'radio',
                          name: 'sendByEnter',
                          id: 'sendByEnterEnabled',
                          value: 'true',
                          defaultChecked: isSendByEnterEnabled,
                          onChange: this.changeSendByEnter }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'sendByEnterEnabled' },
                          _react2.default.createElement(
                            'b',
                            null,
                            'Enter'
                          ),
                          ' – ',
                          this.getIntlMessage('preferencesSendMessage'),
                          ', ',
                          _react2.default.createElement(
                            'b',
                            null,
                            'Shift + Enter'
                          ),
                          ' – ',
                          this.getIntlMessage('preferencesNewLine')
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'radio' },
                        _react2.default.createElement('input', { type: 'radio',
                          name: 'sendByEnter',
                          id: 'sendByEnterDisabled',
                          value: 'false',
                          defaultChecked: !isSendByEnterEnabled,
                          onChange: this.changeSendByEnter }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'sendByEnterDisabled' },
                          _react2.default.createElement(
                            'b',
                            null,
                            'Cmd + Enter'
                          ),
                          ' – ',
                          this.getIntlMessage('preferencesSendMessage'),
                          ', ',
                          _react2.default.createElement(
                            'b',
                            null,
                            'Enter'
                          ),
                          ' – ',
                          this.getIntlMessage('preferencesNewLine')
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: notificationTabContentClassName },
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
                      _react2.default.createElement(
                        'h4',
                        null,
                        this.getIntlMessage('preferencesEffectsTitle')
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'checkbox' },
                        _react2.default.createElement('input', { type: 'checkbox',
                          id: 'soundEffects',
                          defaultChecked: isSoundEffectsEnabled,
                          onChange: this.changeSoundEffectsEnabled }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'soundEffects' },
                          this.getIntlMessage('preferencesEnableEffects')
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
                      _react2.default.createElement(
                        'h4',
                        null,
                        this.getIntlMessage('preferencesNotificationsTitle')
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'checkbox' },
                        _react2.default.createElement('input', { type: 'checkbox',
                          id: 'groupNotifications',
                          defaultChecked: isGroupsNotificationsEnabled,
                          onChange: this.changeGroupsNotificationsEnabled }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'groupNotifications' },
                          this.getIntlMessage('preferencesNotificationsGroup')
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'checkbox' },
                        _react2.default.createElement('input', { type: 'checkbox',
                          id: 'mentionsNotifications',
                          defaultChecked: isOnlyMentionNotifications,
                          onChange: this.changeMentionNotifications }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'mentionsNotifications' },
                          this.getIntlMessage('preferencesNotificationsOnlyMention')
                        )
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: 'hint' },
                        this.getIntlMessage('preferencesNotificationsOnlyMentionHint')
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
                      _react2.default.createElement(
                        'h4',
                        null,
                        this.getIntlMessage('preferencesPrivacyTitle')
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'checkbox' },
                        _react2.default.createElement('input', { type: 'checkbox',
                          id: 'notificationTextPreview',
                          defaultChecked: isShowNotificationsTextEnabled,
                          onChange: this.changeIsShowNotificationTextEnabled }),
                        _react2.default.createElement(
                          'label',
                          { htmlFor: 'notificationTextPreview' },
                          this.getIntlMessage('preferencesMessagePreview')
                        )
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: 'hint' },
                        this.getIntlMessage('preferencesMessagePreviewHint')
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: securityTabContentClassName },
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
                      _react2.default.createElement(
                        'h4',
                        null,
                        this.getIntlMessage('preferencesSessionsTitle')
                      ),
                      _react2.default.createElement(
                        'ul',
                        { className: 'session-list' },
                        sessionList,
                        _react2.default.createElement(
                          'li',
                          { className: 'session-list__session' },
                          _react2.default.createElement(
                            'a',
                            { className: 'link--red', onClick: this.onTerminateAllSessionsClick },
                            this.getIntlMessage('preferencesSessionsTerminateAll')
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }], [{
    key: 'calculateState',
    value: function calculateState() {
      return {
        isOpen: _PreferencesStore2.default.isOpen(),
        isSendByEnterEnabled: _PreferencesStore2.default.isSendByEnterEnabled(),
        isSoundEffectsEnabled: _PreferencesStore2.default.isSoundEffectsEnabled(),
        isGroupsNotificationsEnabled: _PreferencesStore2.default.isGroupsNotificationsEnabled(),
        isOnlyMentionNotifications: _PreferencesStore2.default.isOnlyMentionNotifications(),
        isShowNotificationsTextEnabled: _PreferencesStore2.default.isShowNotificationsTextEnabled(),
        sessions: _PreferencesStore2.default.getSessions(),
        activeTab: _PreferencesStore2.default.getCurrentTab()
      };
    }
  }]);

  return PreferencesModal;
})(_react.Component);

PreferencesModal.getStores = function () {
  return [_PreferencesStore2.default];
};

_reactMixin2.default.onClass(PreferencesModal, _reactIntl.IntlMixin);

exports.default = _utils.Container.create(PreferencesModal);