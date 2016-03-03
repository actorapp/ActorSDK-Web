'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_SHOW, { group: group });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_BY_LINK_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=InviteUserByLinkActions.js.map