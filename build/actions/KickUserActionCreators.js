'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  kickMember: function kickMember(gid, uid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.kickMember(gid, uid), {
      request: _ActorAppConstants.ActionTypes.KICK_USER,
      success: _ActorAppConstants.ActionTypes.KICK_USER_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.KICK_USER_ERROR
    }, { gid: gid, uid: uid });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=KickUserActionCreators.js.map