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
    var str = undefined;

    switch (peer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        str = 'u' + peer.id;
        break;
      case _ActorAppConstants.PeerTypes.GROUP:
        str = 'g' + peer.id;
        break;
      default:
        throw 'Unknown peer type' + peer.type + ' ' + peer.id;
    }

    return str;
  },

  stringToPeer: function stringToPeer(str) {
    var peer = null;

    if (str) {
      var peerId = parseInt(str.substring(1));

      if (peerId > 0) {
        switch (str.substring(0, 1)) {
          case 'u':
            peer = _ActorClient2.default.getUserPeer(peerId);
            break;
          case 'g':
            peer = _ActorClient2.default.getGroupPeer(peerId);
            break;
          default:
        }
      }
    }

    return peer;
  },

  equals: function equals(peer1, peer2) {
    return _lodash2.default.isPlainObject(peer1) && !_lodash2.default.isPlainObject(peer2) || !_lodash2.default.isPlainObject(peer1) && _lodash2.default.isPlainObject(peer2) || peer1.type === peer2.type && peer1.id === peer2.id;
  }
};
//# sourceMappingURL=PeerUtils.js.map