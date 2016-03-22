'use strict';

exports.__esModule = true;

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _PeerUtils = require('./PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterHooks = {
  requireAuth: function requireAuth(nextState, replaceState) {
    if (!_LoginStore2.default.isLoggedIn()) {
      replaceState({
        pathname: '/auth',
        state: {
          nextPathname: nextState.location.pathname
        }
      });
    }
  },
  onDialogEnter: function onDialogEnter(nextState, replaceState) {
    var peer = _PeerUtils2.default.stringToPeer(nextState.params.id);
    if (!_PeerUtils2.default.hasPeer(peer)) {
      console.error('Invalig peer', nextState);
      replaceState('/im');
    } else {
      _DialogActionCreators2.default.selectDialogPeer(peer);
    }
  },
  onDialogLeave: function onDialogLeave() {
    _DialogActionCreators2.default.selectDialogPeer(null);
  }
};

exports.default = RouterHooks;
//# sourceMappingURL=RouterHooks.js.map