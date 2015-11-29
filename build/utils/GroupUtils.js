'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMember = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ActorClient = require('./ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasMember = exports.hasMember = function hasMember(gid, uid) {
  var group = _ActorClient2.default.getGroup(gid);
  var isMember = false;

  _lodash2.default.forEach(group.members, function (member) {
    if (member.peerInfo.peer.id === uid) isMember = true;
  });

  return isMember;
};