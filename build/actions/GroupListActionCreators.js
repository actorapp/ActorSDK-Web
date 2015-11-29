'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupListActionCreators = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findGroups(), {
      request: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD,
      success: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_ERROR
    });
  },
  close: function close() {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_LIST_HIDE);
  },

  search: function search(query) {
    return (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_LIST_SEARCH, { query: query });
  }

}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = GroupListActionCreators;