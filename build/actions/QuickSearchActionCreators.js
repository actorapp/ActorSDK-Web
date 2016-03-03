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
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  setQuickSearchList: function setQuickSearchList(list) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH_CHANGED, { list: list });
  },
  search: function search(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.QUICK_SEARCH, { query: query });
  }
};
//# sourceMappingURL=QuickSearchActionCreators.js.map