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
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_SHOW);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_HIDE);
  },
  setQuickSearchList: function setQuickSearchList(list) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_CHANGED, { list: list });
  },
  search: function search(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH, { query: query });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */