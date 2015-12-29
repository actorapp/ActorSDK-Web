'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  openMessageActions: function openMessageActions(targetRect, message) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DROPDOWN_SHOW, { targetRect: targetRect, message: message });
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DROPDOWN_HIDE);
  }
};
//# sourceMappingURL=DropdownActionCreators.js.map