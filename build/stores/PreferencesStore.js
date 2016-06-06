'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var PreferencesStore = function (_ReduceStore) {
  _inherits(PreferencesStore, _ReduceStore);

  function PreferencesStore() {
    _classCallCheck(this, PreferencesStore);

    return _possibleConstructorReturn(this, _ReduceStore.apply(this, arguments));
  }

  PreferencesStore.prototype.getInitialState = function getInitialState() {
    return {
      sessions: [],
      currentTab: _ActorAppConstants.PreferencesTabTypes.GENERAL,
      terminateState: {}
    };
  };

  PreferencesStore.prototype.reduce = function reduce(state, action) {
    switch (action.type) {
      case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_LOAD_SUCCESS:
        return _extends({}, state, {
          sessions: action.response
        });
      case _ActorAppConstants.ActionTypes.PREFERENCES_MODAL_HIDE:
        return this.getInitialState();

      case _ActorAppConstants.ActionTypes.PREFERENCES_CHANGE_TAB:
        return _extends({}, state, {
          currentTab: action.tab
        });

      case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE:
        state.terminateState[action.id] = _ActorAppConstants.AsyncActionStates.PROCESSING;
        return state;
      case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_SUCCESS:
        delete state.terminateState[action.id];
        return state;
      case _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ERROR:
        state.terminateState[action.id] = _ActorAppConstants.AsyncActionStates.FAILURE;
        return state;

      default:
        return state;
    }
  };

  PreferencesStore.prototype.isSendByEnterEnabled = function isSendByEnterEnabled() {
    return _ActorClient2.default.isSendByEnterEnabled();
  };

  PreferencesStore.prototype.isGroupsNotificationsEnabled = function isGroupsNotificationsEnabled() {
    return _ActorClient2.default.isGroupsNotificationsEnabled();
  };

  PreferencesStore.prototype.isOnlyMentionNotifications = function isOnlyMentionNotifications() {
    return _ActorClient2.default.isOnlyMentionNotifications();
  };

  PreferencesStore.prototype.isSoundEffectsEnabled = function isSoundEffectsEnabled() {
    return _ActorClient2.default.isSoundEffectsEnabled();
  };

  PreferencesStore.prototype.isShowNotificationsTextEnabled = function isShowNotificationsTextEnabled() {
    return _ActorClient2.default.isShowNotificationsTextEnabled();
  };

  PreferencesStore.prototype.isAnimationAutoPlayEnabled = function isAnimationAutoPlayEnabled() {
    return _ActorClient2.default.isAnimationAutoPlayEnabled();
  };

  PreferencesStore.prototype.getSessions = function getSessions() {
    return this.getState().sessions;
  };

  PreferencesStore.prototype.getCurrentTab = function getCurrentTab() {
    return this.getState().currentTab;
  };

  PreferencesStore.prototype.getTerminateState = function getTerminateState() {
    return this.getState().terminateState;
  };

  return PreferencesStore;
}(_utils.ReduceStore);

exports.default = new PreferencesStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=PreferencesStore.js.map