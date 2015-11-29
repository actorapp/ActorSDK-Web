'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_MODAL_SHOW);
    this.loadSessions();
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.PREFERENCES_MODAL_HIDE);
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
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */