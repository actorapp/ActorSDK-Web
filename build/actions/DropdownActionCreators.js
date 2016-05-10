'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  openMessageActions: function openMessageActions(targetRect, message) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_DROPDOWN_SHOW, { targetRect: targetRect, message: message });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  openRecentContextMenu: function openRecentContextMenu(contextPos, peer) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.RECENT_CONTEXT_MENU_SHOW, { contextPos: contextPos, peer: peer });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hideMessageDropdown: function hideMessageDropdown() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_DROPDOWN_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  hideRecentContext: function hideRecentContext() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.RECENT_CONTEXT_MENU_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=DropdownActionCreators.js.map