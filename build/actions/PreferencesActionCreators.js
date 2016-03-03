'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  show: function show() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_MODAL_SHOW);
    this.loadSessions();
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  save: function save(preferences) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_SAVE, {
      preferences: preferences
    });
  },
  changeTab: function changeTab(tab) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_CHANGE_TAB, {
      tab: tab
    });
  },
  loadSessions: function loadSessions() {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.loadSessions(), {
      request: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_LOAD,
      success: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_LOAD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_LOAD_ERROR
    });
  },
  terminateSession: function terminateSession(id) {
    var _this = this;

    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.terminateSession(id), {
      request: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE,
      success: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ERROR
    }, { id: id }).then(
    // Reload active session list
    function () {
      return _this.loadSessions();
    });
  },
  terminateAllSessions: function terminateAllSessions() {
    var _this2 = this;

    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.terminateAllSessions(), {
      request: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ALL,
      success: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.PREFERENCES_SESSION_TERMINATE_ALL_ERROR
    }).then(
    // Reload active session list
    function () {
      return _this2.loadSessions();
    });
  }
};
//# sourceMappingURL=PreferencesActionCreators.js.map