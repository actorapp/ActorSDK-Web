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
  show: function show(group) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_MODAL_SHOW, {
      group: group
    });
  },

  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.INVITE_USER_MODAL_HIDE);
  },

  inviteUser: function inviteUser(gid, uid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.inviteMember(gid, uid), {
      request: _ActorAppConstants.ActionTypes.INVITE_USER,
      success: _ActorAppConstants.ActionTypes.INVITE_USER_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.INVITE_USER_ERROR
    }, { gid: gid, uid: uid });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=InviteUserActions.js.map