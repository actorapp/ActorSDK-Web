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

var GroupListActionCreators = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_LIST_SHOW);
    this.loadGroups();
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_LIST_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  search: function search(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_LIST_SEARCH, { query: query });
  },
  loadGroups: function loadGroups() {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findGroups(), {
      request: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD,
      success: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_ERROR
    });
  }
};

exports.default = GroupListActionCreators;
//# sourceMappingURL=GroupListActionCreators.js.map