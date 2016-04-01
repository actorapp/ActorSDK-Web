'use strict';

exports.__esModule = true;
exports.hasMember = undefined;

var _lodash = require('lodash');

var _ActorClient = require('./ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2016 Actor LLC. <https://actor.im>
 */

var hasMember = exports.hasMember = function hasMember(gid, uid) {
  var group = _ActorClient2.default.getGroup(gid);

  return undefined !== (0, _lodash.find)(group.members, function (c) {
    return c.peerInfo.peer.id === uid;
  });
};
//# sourceMappingURL=GroupUtils.js.map