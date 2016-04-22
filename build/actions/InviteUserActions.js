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
  show: function show(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW, { group: group });
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  inviteUser: function inviteUser(gid, uid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.inviteMember(gid, uid), {
      request: _ActorAppConstants.ActionTypes.INVITE_USER,
      success: _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.INVITE_USER_ERROR
    }, { gid: gid, uid: uid });
  }
};
//# sourceMappingURL=InviteUserActions.js.map