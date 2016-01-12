'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false,
    _sessions = [],
    _currentTab = 'GENERAL',
    _terminateSessionState = [];

var PreferencesStore = (function (_Store) {
  _inherits(PreferencesStore, _Store);

  function PreferencesStore(Dispatcher) {
    _classCallCheck(this, PreferencesStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PreferencesStore).call(this, Dispatcher));
  }

  _createClass(PreferencesStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }
  }, {
    key: 'isSendByEnterEnabled',
    value: function isSendByEnterEnabled() {
      return _ActorClient2.default.isSendByEnterEnabled();
    }
  }, {
    key: 'isGroupsNotificationsEnabled',
    value: function isGroupsNotificationsEnabled() {
      return _ActorClient2.default.isGroupsNotificationsEnabled();
    }
  }, {
    key: 'isOnlyMentionNotifications',
    value: function isOnlyMentionNotifications() {
      return _ActorClient2.default.isOnlyMentionNotifications();
    }
  }, {
    key: 'isSoundEffectsEnabled',
    value: function isSoundEffectsEnabled() {
      return _ActorClient2.default.isSoundEffectsEnabled();
    }
  }, {
    key: 'isShowNotificationsTextEnabled',
    value: function isShowNotificationsTextEnabled() {
      return _ActorClient2.default.isShowNotificationsTextEnabled();
    }
  }, {
    key: 'getSessions',
    value: function getSessions() {
      return _sessions;
    }
  }, {
    key: 'getCurrentTab',
    value: function getCurrentTab() {
      return _currentTab;
    }
  }, {
    key: 'getTerminateSessionState',
    value: function getTerminateSessionState(id) {
      return _terminateSessionState[id] || _ActorAppConstants.AsyncActionStates.PENDING;
    }
  }, {
    key: 'savePreferences',
    value: function savePreferences(newPreferences) {
      var isSendByEnterEnabled = newPreferences.isSendByEnterEnabled;
      var isSoundEffectsEnabled = newPreferences.isSoundEffectsEnabled;
      var isGroupsNotificationsEnabled = newPreferences.isGroupsNotificationsEnabled;
      var isOnlyMentionNotifications = newPreferences.isOnlyMentionNotifications;
      var isShowNotificationsTextEnabled = newPreferences.isShowNotificationsTextEnabled;

      _ActorClient2.default.changeSendByEnter(isSendByEnterEnabled);
      _ActorClient2.default.changeSoundEffectsEnabled(isSoundEffectsEnabled);
      _ActorClient2.default.changeGroupNotificationsEnabled(isGroupsNotificationsEnabled);
      _ActorClient2.default.changeIsOnlyMentionNotifications(isOnlyMentionNotifications);
      _ActorClient2.default.changeIsShowNotificationTextEnabled(isShowNotificationsTextEnabled);
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.PREFERENCES_MODAL_SHOW:
          _isOpen = true;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_MODAL_HIDE:
          _isOpen = false;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_SAVE:
          this.savePreferences(action.preferences);
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_LOAD_SUCCESS:
          _sessions = action.response;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_CHANGE_TAB:
          _currentTab = action.tab;
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE:
          _terminateSessionState[action.id] = _ActorAppConstants.AsyncActionStates.PROCESSING;
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_SUCCESS:
          delete _terminateSessionState[action.id];
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ERROR:
          _terminateSessionState[action.id] = _ActorAppConstants.AsyncActionStates.FAILURE;
          this.__emitChange();
          break;

        default:
      }
    }
  }]);

  return PreferencesStore;
})(_utils.Store);

exports.default = new PreferencesStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=PreferencesStore.js.map