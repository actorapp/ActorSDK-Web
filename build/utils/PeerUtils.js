'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('./ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  peerToString: function peerToString(peer) {
    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        return _ActorAppConstants.PeerTypePrefixes.USER + peer.id;
      case _ActorAppConstants.PeerTypes.GROUP:
        return _ActorAppConstants.PeerTypePrefixes.GROUP + peer.id;
      default:
        throw new Error('Unknown peer type: ' + peer.type + ' ' + peer.id);
    }
  },
  stringToPeer: function stringToPeer(str) {
    var peerId = parseInt(str.substring(1), 10);
    switch (str.substring(0, 1)) {
      case _ActorAppConstants.PeerTypePrefixes.USER:
        return _ActorClient2.default.getUserPeer(peerId);
      case _ActorAppConstants.PeerTypePrefixes.GROUP:
        return _ActorClient2.default.getGroupPeer(peerId);
      default:
        throw new Error('Unknown peer type: ' + str);
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
    return _lodash2.default.isPlainObject(peer1) && !_lodash2.default.isPlainObject(peer2) || !_lodash2.default.isPlainObject(peer1) && _lodash2.default.isPlainObject(peer2) || peer1.type === peer2.type && peer1.id === peer2.id;
  }
};
//# sourceMappingURL=PeerUtils.js.map