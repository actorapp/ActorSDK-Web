'use strict';

exports.__esModule = true;

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('./ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  peerToString: function peerToString(peer) {
    var id = peer.id;
    var type = peer.type;


    switch (type) {
      case _ActorAppConstants.PeerTypes.USER:
        return _ActorAppConstants.PeerTypePrefixes.USER + id;
      case _ActorAppConstants.PeerTypes.GROUP:
        return _ActorAppConstants.PeerTypePrefixes.GROUP + id;
      default:
        console.error('Unknown peer type: { type: %s, id: %s }', type, id);
    }
  },
  stringToPeer: function stringToPeer(str) {
    var type = str.charAt(0);
    var id = parseInt(str.substring(1), 10);

    switch (type) {
      case _ActorAppConstants.PeerTypePrefixes.USER:
        return _ActorClient2.default.getUserPeer(id);
      case _ActorAppConstants.PeerTypePrefixes.GROUP:
        return _ActorClient2.default.getGroupPeer(id);
      default:
        console.error('Unknown peer type: { type: %s, id: %s }', type, id);
    }
  },
  hasPeer: function hasPeer(peer) {
    try {
      switch (peer.type) {
        case _ActorAppConstants.PeerTypes.USER:
          return _ActorClient2.default.getUser(peer.id);
        case _ActorAppConstants.PeerTypes.GROUP:
          return _ActorClient2.default.getGroup(peer.id);
      }
    } catch (e) {
      console.error(e);
    }

    return false;
  },
  equals: function equals(peer1, peer2) {
    return Boolean(peer1 && peer2) && peer1.id === peer2.id && peer1.type === peer2.type;
  }
};
//# sourceMappingURL=PeerUtils.js.map