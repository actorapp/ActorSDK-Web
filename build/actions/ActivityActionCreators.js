'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  show: function show() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ACTIVITY_SHOW);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.ACTIVITY_HIDE);
  }
};
//# sourceMappingURL=ActivityActionCreators.js.map