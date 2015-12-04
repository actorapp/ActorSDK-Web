'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PeerStore = {
  getUserPeer: function getUserPeer(uid) {
    return _ActorClient2.default.getUserPeer(uid);
  },
  getGroupPeer: function getGroupPeer(gid) {
    return _ActorClient2.default.getGroupPeer(gid);
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = PeerStore;
//# sourceMappingURL=PeerStore.js.map